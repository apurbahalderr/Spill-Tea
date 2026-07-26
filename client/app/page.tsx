"use client";

import { useState } from "react";
import JoinForm from "@/components/JoinForm";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  const handleJoin = (name: string) => {
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