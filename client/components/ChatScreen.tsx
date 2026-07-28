"use client"
import {useState , useEffect} from 'react'
import {socket} from '@/lib/socket'
import { Message } from '@/types/chat'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

interface ChatScreenProps {
  username: string;
}

export default function ChatScreen({username}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
useEffect(()=>{
socket.on("receive-message", (message: Message)=>{
   setMessages((prev) => [...prev, message]);
  })
  return () => {
    socket.off("receive-message");
  }
},[])
function handleSendMessage(message: string){
  const newMessage : Message = {
    id: crypto.randomUUID(),
    username: username,
    text: message,
    timestamp: Date.now()
  }
  socket.emit("send-message", newMessage);
}



  return (
    <div className="flex flex-col h-screen w-full">
    <div className="flex-1 overflow-y-auto">
      <MessageList messages={messages} currentUsername={username} />
    </div>
    <ChatInput onSend={handleSendMessage} />
  </div>
  )
}
