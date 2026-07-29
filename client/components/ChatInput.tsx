"use client";
import { useRef , useEffect} from "react";
import { socket } from "@/lib/socket";
import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  username: string;
}

export default function ChatInput({ onSend, username }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (trimmed !== "") {
      onSend(trimmed);
      setInputValue("");
    }
  };
useEffect(() => {
  return () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
}, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
      className="flex gap-2 p-4 border-t border-gray-300"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          socket.emit("typing", username);
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop-typing", username);
          }, 2000);
        }}
        placeholder="Type a message..."
        className="bg-gray-100 text-gray-800 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 px-3"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
}
