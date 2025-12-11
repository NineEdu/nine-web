//@ts-nocheck
"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

// 1. Định nghĩa Interface cho Props
interface VideoProps {
  url: string;
  onDurationFound?: (duration: number) => void;
  onEnded?: () => void; // [NEW] Thêm callback onEnded (không trả về gì)
}

const VideoPlayer = ({ url, onDurationFound, onEnded }: VideoProps) => {
  const [isClient, setIsClient] = useState(false);

  // Xử lý Hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render State: Loading
  if (!isClient) {
    return (
      <div className="aspect-video bg-slate-200 rounded-md animate-pulse mt-2 flex items-center justify-center text-slate-400 text-xs">
        Loading Player...
      </div>
    );
  }

  if (!url) return null;

  return (
    <div className="relative aspect-video rounded-md overflow-hidden bg-slate-100 mt-2">
      <ReactPlayer
        src={url} // [NOTE] ReactPlayer dùng prop 'url', mình đã sửa lại từ 'src' cho đúng chuẩn
        width="100%"
        height="100%"
        controls={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
        // [NEW] Xử lý khi video kết thúc
        onEnded={() => {
          console.log("Video ended");
          if (onEnded) {
            onEnded();
          }
        }}
        onDuration={(duration: number) => {
          if (onDurationFound) {
            onDurationFound(duration);
          }
        }}
        onError={(e: any) => console.error("Video Error:", e)}
      />
    </div>
  );
};

export default VideoPlayer;
