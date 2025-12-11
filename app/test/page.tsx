//@ts-nocheck
"use client"

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Copy, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"; // Icon (nếu có cài lucide-react)
// Nếu chưa có lucide-react: npm install lucide-react
// Hoặc thay bằng text thường nếu không muốn cài thêm icon.

// KẾT NỐI SOCKET (Thay PORT 5002 cho khớp backend)
const SOCKET_URL = "http://localhost:5002";

const TestRelay = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null); // Request đang chờ
  const [jsonInput, setJsonInput] = useState(""); // Nội dung bạn paste vào
  const [error, setError] = useState(null);

  // Ref để auto scroll hoặc focus
  const inputRef = useRef(null);

  useEffect(() => {
    // 1. Khởi tạo kết nối
    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    // 2. Lắng nghe sự kiện connect
    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("🟢 Connected to Relay Server");
      // Quan trọng: Join vào room Admin ngay khi connect
      newSocket.emit("join_relay");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("🔴 Disconnected");
    });

    // 3. Lắng nghe Server gửi yêu cầu tạo Quiz
    newSocket.on("server_request_quiz", (data) => {
      console.log("📩 Nhận request mới:", data);
      setCurrentRequest(data);
      // Play sound notification nếu thích (optional)
      // new Audio('/ping.mp3').play();
    });

    return () => newSocket.disconnect();
  }, []);

  // Hàm copy prompt nhanh
  const handleCopyPrompt = () => {
    if (currentRequest?.prompt) {
      navigator.clipboard.writeText(currentRequest.prompt);
      alert("Đã copy Prompt! Paste vào Gemini ngay.");
    }
  };

  // Hàm gửi kết quả về Server
  const handleSendBack = () => {
    if (!jsonInput.trim()) {
      setError("Chưa nhập JSON!");
      return;
    }

    try {
      // 1. Clean data (đề phòng copy dính markdown ```json)
      const cleanJson = jsonInput.replace(/```json|```/g, "").trim();

      // 2. Validate JSON
      const parsedData = JSON.parse(cleanJson);

      // 3. Gửi lại server
      socket.emit("relay_response_quiz", {
        requestId: currentRequest.requestId,
        data: parsedData,
      });

      // 4. Reset trạng thái để đón request tiếp theo
      setCurrentRequest(null);
      setJsonInput("");
      setError(null);
    } catch (err) {
      setError("JSON không hợp lệ! Hãy kiểm tra lại dấu phẩy, ngoặc kép...");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            🤖 AI Relay Station
          </h1>
          <p className="text-sm text-gray-500">Human-in-the-loop Processing</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="font-medium text-sm">
            {isConnected ? "Connected to Server" : "Disconnected"}
          </span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
        {/* CỘT TRÁI: INCOMING REQUEST (PROMPT) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col relative overflow-hidden">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📥 Incoming Request
            {currentRequest && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded animate-pulse">
                New!
              </span>
            )}
          </h2>

          {!currentRequest ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin mb-2" />
              <p>Đang chờ request từ user...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="text-xs text-gray-400 mb-2">
                Request ID: {currentRequest.requestId}
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex-1 overflow-auto font-mono text-sm whitespace-pre-wrap border border-gray-200">
                {currentRequest.prompt}
              </div>
              <button
                onClick={handleCopyPrompt}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Copy size={18} /> Copy Prompt
              </button>
            </div>
          )}
        </div>

        {/* CỘT PHẢI: OUTGOING RESPONSE (JSON INPUT) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            📤 Relay Response
          </h2>

          <textarea
            ref={inputRef}
            className="flex-1 w-full bg-slate-900 text-green-400 font-mono text-sm p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder='Paste JSON kết quả từ Gemini/ChatGPT vào đây... Ví dụ: [{"questionText": "...", ...}]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            disabled={!currentRequest} // Chỉ cho nhập khi có request
          ></textarea>

          {error && (
            <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            onClick={handleSendBack}
            disabled={!currentRequest || !jsonInput}
            className={`mt-4 w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all
              ${
                !currentRequest || !jsonInput
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white active:scale-95"
              }`}
          >
            <Send size={18} /> Send back to User
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestRelay;
