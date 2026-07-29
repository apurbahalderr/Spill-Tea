"use client";

import { useState } from "react";
import JoinForm from "@/components/JoinForm";
import { socket } from "@/lib/socket";
import ChatScreen from "@/components/ChatScreen";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  const handleJoin = (name: string) => {
    socket.connect();
    socket.emit("join", name);
    setUsername(name);
  };

  return (
    <main>
      {username ? (
        <ChatScreen username={username} />
      ) : (
        <JoinForm onJoin={handleJoin} />
      )}
    </main>
  );
}
