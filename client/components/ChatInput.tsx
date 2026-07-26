"use client"
import React from 'react'
import {useState} from 'react'

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (trimmed !== "") {
      onSend(trimmed);
      setInputValue("");
    }
  };

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
        onChange={(e) => setInputValue(e.target.value)}
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