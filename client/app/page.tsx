"use client";

import { useState } from "react";
import JoinForm from "@/components/JoinForm";
import {socket} from "@/lib/socket";

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
        <div>Welcome, {username}!  </div>
      ) : (
        <JoinForm onJoin={handleJoin} />
      )}
    </main>
  );
}