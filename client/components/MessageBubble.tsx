import React from "react";
import { ChatMessage } from "@/types/chat";
interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}
export default function MessageBubble({
  message,
  isOwnMessage,
}: MessageBubbleProps) {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      className={`flex flex-col mb-2 ${isOwnMessage ? "items-end" : "items-start"}`}
    >
      {!isOwnMessage && (
        <span className="text-xs text-gray-500 mb-1">{message.username}</span>
      )}
      <div
        className={`px-4 py-2 rounded-lg ${isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
      >
        <p>{message.text}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{formattedTime}</span>
    </div>
  );
}
