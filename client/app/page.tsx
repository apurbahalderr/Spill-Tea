"use client";

import { useState } from "react";
import JoinForm from "@/components/JoinForm";
import { socket } from "@/lib/socket";
import ChatScreen from "@/components/ChatScreen";
import Lobby from "@/components/Lobby";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const handleJoin = (name: string) => {
    socket.connect();
    setUsername(name);
  };

  if (!username) {
    return <JoinForm onJoin={handleJoin} />; // ← this IS a return
  }

  if (!roomCode) {
    return <Lobby username={username} onRoomReady={setRoomCode} />; // ← this IS a return
  }

  return <ChatScreen username={username} roomCode={roomCode} />;
}
