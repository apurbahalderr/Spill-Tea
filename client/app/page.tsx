"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

export default function Home() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Check your browser console</div>;
}