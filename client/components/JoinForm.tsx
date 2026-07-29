"use client"
import React from 'react'
import { useState } from 'react'

interface JoinFormProps {
  onJoin: (username: string) => void;
}

function JoinForm({ onJoin }: JoinFormProps) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Username cannot be empty");
      return;
    }
    setError(null);
    onJoin(trimmedUsername)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50/40 via-white to-white">
      {/* Header */}
      <header className="mx-6 pt-3">
        <div className="flex items-center justify-between px-2 py-4">
          <h1 className="flex items-center gap-2 text-3xl font-black text-black tracking-tight">
            Spill Tea <span className="inline-block rotate-12">☕</span>
          </h1>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white hover:shadow-lg transition-transform hover:scale-[1.02]">
            👤
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-8 lg:flex-row">

        {/* Left Side */}
        <div className="max-w-xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-600 hover:shadow-lg transition-transform hover:scale-[1.02]">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            People are chatting right now
          </div>

          <h2 className="mt-6 text-6xl font-black leading-tight text-black">
            Spill it.
            <br />
            Stay{" "}
            <span className="text-purple-500">
              real.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Spill Tea is a chill anonymous chat room where you can
            talk freely, meet new people, ask questions, vent,
            or simply enjoy genuine conversations.
          </p>

          {/* Feature Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-l-4 border-l-purple-400 bg-purple-50/40 p-5 shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-black">🎭 Anonymous</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your identity stays private.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-black">⚡ Instant</h3>
              <p className="mt-2 text-sm text-gray-500">
                Join and start chatting.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-black">💬 Real People</h3>
              <p className="mt-2 text-sm text-gray-500">
                No bots. Just conversations.
              </p>
            </div>

            <div className="rounded-2xl border border-l-4 border-l-purple-400 bg-purple-50/40 p-5 shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-black">❤️ No Judgement</h3>
              <p className="mt-2 text-sm text-gray-500">
                Say what's on your mind.
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white p-10 shadow-2xl shadow-purple-100 hover:shadow-lg transition-transform hover:scale-[1.02] border-t-4 border-t-purple-400 border-b-4 border-b-purple-400">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">
              💬
            </div>

            <h2 className="text-4xl font-bold text-black">
              Join Chat
            </h2>

            <p className="mt-3 text-gray-500">
              Pick a cool username and join the vibe 👋
            </p>
          </div>

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-xl border border-gray-200 px-5 py-4 text-gray-500 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-purple-500 to-indigo-500 py-4 text-lg font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl active:scale-95"
            >
              Join Chat →
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            🔒 No signup needed. 100% anonymous.
          </p>

        </div>

      </main>
    </div>
  );
}

export default JoinForm