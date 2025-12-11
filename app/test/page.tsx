// frontend/app/quiz-proxy/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function QuizProxyPage() {
  const [prompt, setPrompt] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<string>("Đang chờ prompt...");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:7071");
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("Connected to Relay UI");
      console.log("[UI] connected to relay");
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // expected { sessionId, prompt }
        if (data.prompt) {
          setPrompt(data.prompt);
          setStatus(
            "Đã nhận prompt. Copy sang Gemini -> paste kết quả ở ô dưới."
          );
        }
      } catch (err) {
        console.warn("[UI] message parse fail:", err);
      }
    };

    ws.onclose = () => {
      setStatus("Disconnected from Relay");
      console.log("[UI] disconnected");
    };

    ws.onerror = (ev) => {
      console.error("[UI] ws error", ev);
      setStatus("WebSocket error");
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  const handleSendBack = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      alert("Không kết nối tới relay");
      return;
    }

    // The UI must send back a JSON containing sessionId and answer.
    // But this page doesn't know sessionId (it was included in incoming message).
    // For convenience, we parse it from the last prompt message by reading a hidden field.
    // Approach: last incoming message was JSON with sessionId; we saved prompt only.
    // To forward sessionId, we will store last incoming raw message in a ref.

    // Simpler: store lastRaw in closure (we'll implement).
    // But for now, we expect the UI receives { sessionId, prompt } and saved it in window.lastRelay.
    // Implement robustly below.
    const last = (window as any).__lastRelayMessage;
    if (!last || !last.sessionId) {
      alert("Không có sessionId. Hãy refresh trang và đợi prompt mới.");
      return;
    }

    try {
      // try parse answer as JSON to be safe
      const maybeJson = JSON.parse(answer);
      // send { sessionId, answer: maybeJson }
      ws.send(JSON.stringify({ sessionId: last.sessionId, answer: maybeJson }));
    } catch {
      // send as raw string if not JSON
      ws.send(JSON.stringify({ sessionId: last.sessionId, answer: answer }));
    }

    setStatus("Đã gửi câu trả lời về relay");
    setAnswer("");
  };

  // Hook to capture the raw message with sessionId
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws) return;
    const handler = (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.sessionId) {
          (window as any).__lastRelayMessage = parsed;
        }
      } catch {}
    };
    ws.addEventListener("message", handler);
    return () => ws.removeEventListener("message", handler);
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>
        AI Relay — UI (Quiz Proxy)
      </h1>
      <p style={{ marginBottom: 12 }}>{status}</p>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Prompt (read-only)</label>
        <textarea
          value={prompt}
          readOnly
          style={{
            width: "100%",
            height: 220,
            marginTop: 8,
            padding: 12,
            borderRadius: 8,
          }}
        />
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>
          Dán câu trả lời từ Gemini (JSON) / hoặc plain text
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder='Paste JSON trả về từ Gemini, ví dụ: [{"questionText":"...","options":["..."], ...}]'
          style={{
            width: "100%",
            height: 220,
            marginTop: 8,
            padding: 12,
            borderRadius: 8,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleSendBack}
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Send back to Relay
        </button>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(prompt);
            alert("Copied prompt");
          }}
          style={{
            padding: "10px 18px",
            border: "1px solid #ddd",
            borderRadius: 8,
            cursor: "pointer",
            background: "white",
          }}
        >
          Copy Prompt
        </button>
      </div>
    </div>
  );
}
