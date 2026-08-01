"use client";
import { useState } from "react";
import { socket } from "@/lib/socket";

import { Plus, Users, ShieldCheck, Hash } from "lucide-react";
interface LobbyProps {
  username: string;
  onRoomReady: (roomCode: string) => void;
}

export default function Lobby({ username, onRoomReady }: LobbyProps) {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleCreateRoom = () => {
    socket.emit("create-room", username);
    socket.once("room-created", (code: string) => {
      onRoomReady(code);
    });
  };
  const handleJoinRoom = () => {
    const trimmedCode = joinCode.trim().toUpperCase();
    if (!trimmedCode) return;

    setError(null);
    socket.emit("join-room", { roomCode: trimmedCode, username });

    socket.once("room-joined", (code: string) => {
      onRoomReady(code);
    });

    socket.once("room-not-found", () => {
      setError("Room not found. Check the code and try again.");
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-purple-50 to-white">
      {/* ================= Header ================= */}
      <header className="mx-6 pt-6">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-100">
          <div className="flex items-center justify-between px-8 py-5">
            <h1 className="text-4xl font-black tracking-tight">Spill Tea ☕</h1>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-xl">
              👤
            </div>
          </div>
        </div>
      </header>

      {/* ================= Hero ================= */}

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <span className="rounded-full bg-purple-100 px-5 py-2 text-sm font-medium text-purple-700">
            ● Lobby
          </span>

          <h1 className="mt-8 text-6xl font-black tracking-tight text-gray-900">
            Hey,{" "}
            <span className="bg-linear-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              {username}
            </span>
            ! 👋
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-gray-600">
            Create your own room to start spilling the tea, or join your friends
            using a room code.
          </p>
        </div>

        {/* ================= Cards ================= */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          {/* Create Room */}

          <div className="group rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition group-hover:scale-110">
              <Plus size={38} />
            </div>

            <h2 className="mt-8 text-center text-4xl font-bold">Create Room</h2>

            <p className="mt-5 text-center text-lg leading-8 text-gray-500">
              Start a brand new room and invite your friends to join instantly.
            </p>

            <button
              className="mt-10 w-full rounded-2xl bg-linear-to-r
              from-violet-500 to-indigo-500 py-4 text-lg font-semibold
              text-white transition hover:scale-[1.02]"
              onClick={handleCreateRoom}
            >
              ✨ Create Room
            </button>
          </div>

          {/* Join Room */}

          <div className="group rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition group-hover:scale-110">
              <Users size={36} />
            </div>

            <h2 className="mt-8 text-center text-4xl font-bold">Join Room</h2>

            <p className="mt-5 text-center text-lg leading-8 text-gray-500">
              Got a room code? Enter it below and jump right into the
              conversation.
            </p>

            <div className="relative mt-8">
              <Hash
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                type="text"
                placeholder="Enter room code"
                className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-5 text-lg outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <button
              className="mt-6 w-full rounded-2xl bg-linear-to-r
              from-violet-500 to-indigo-500 py-4 text-lg font-semibold
              text-white transition hover:scale-[1.02]"
              onClick={handleJoinRoom}
            >
              Join Room →
            </button>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow-md">
            <ShieldCheck size={18} className="text-violet-500" />

            <span className="text-gray-600">
              Your conversations are private & encrypted.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
