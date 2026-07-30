"use client";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { ChatEvent, ChatMessage } from "@/types/chat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import OnlineUsers from "@/components/OnlineUsers";

interface ChatScreenProps {
  username: string;
}

export default function ChatScreen({ username }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatEvent[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  useEffect(() => {
    socket.on("receive-message", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on("online-users", (users: string[]) => {
      setOnlineUsers(users);
    });
    socket.on("typing", (username: string) => setTypingUser(username));
    socket.on("stop-typing", () => setTypingUser(null));
    return () => {
      socket.off("receive-message");
      socket.off("online-users");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, []);
  function handleSendMessage(message: string) {
    const newMessage: ChatMessage = {
      type: "message",
      id: crypto.randomUUID(),
      username: username,
      text: message,
      timestamp: Date.now(),
    };
    socket.emit("send-message", newMessage);
  }

  return (
    <div className="flex flex-col h-screen w-full bg-linear-to-b from-purple-50/60 via-white to-white">
    <header className="px-4 py-3 border-b border-gray-300 bg-white flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-black text-black tracking-tight">
          Spill Tea <span className="inline-block rotate-12">☕</span>
        </h1>

        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full border border-purple-100 transition"
        >
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {isSidebarOpen ? "Hide Online Users" : "Show Online Users"}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? "w-56" : "w-0"}`}
        >
          <OnlineUsers users={onlineUsers} />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} currentUsername={username} />
          </div>

          <div className="px-4 h-6 flex items-center">
            {typingUser && (
              <span className="inline-flex items-center gap-1.5 text-sm text-purple-600 italic">
                <span className="flex gap-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" />
                </span>
                {typingUser} is typing
              </span>
            )}
          </div>

          <ChatInput onSend={handleSendMessage} username={username} />
        </div>
      </div>
    </div>
  );
}
