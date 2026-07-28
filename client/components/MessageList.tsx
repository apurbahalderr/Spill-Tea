"use client"
import { useEffect, useRef } from 'react'
import { ChatEvent } from '@/types/chat'
import MessageBubble from './MessageBubble';
import SystemMessageBubble from './SystemMessageBubble';

interface MessageListProps {
  messages: ChatEvent[];
  currentUsername: string;
}

export default function MessageList({ messages, currentUsername }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-end p-4 overflow-y-auto h-full">
      {messages.map((event) =>
        event.type === "message" ? (
          <MessageBubble
            key={event.id}
            message={event}
            isOwnMessage={event.username === currentUsername}
          />
        ) : (
          <SystemMessageBubble key={event.id} message={event} />
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
}