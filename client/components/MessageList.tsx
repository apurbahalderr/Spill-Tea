import React from 'react'
import {Message} from '@/types/chat'
import MessageBubble from './MessageBubble';
interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

export default function MessageList({messages, currentUsername}: MessageListProps) {
  return (
    <div className="flex flex-col p-4 overflow-y-auto h-full">
      {messages.map((message) => (
        <MessageBubble
          key = {message.id}
          message={message}
          isOwnMessage={message.username === currentUsername}
        />
      ))}
    </div>
  )
}
