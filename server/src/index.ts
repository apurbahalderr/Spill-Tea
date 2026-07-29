import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { ChatMessage, SystemMessage } from "./types/chat";

const app = express();
app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const connectedUsers = new Map<string, string>();
function broadcastOnlineUsers() {
  const usernames = Array.from(connectedUsers.values());
  io.emit("online-users", usernames);
}

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on("join", (username: string) => {
    connectedUsers.set(socket.id, username);
    console.log(`👤 ${username} joined (socket: ${socket.id})`);

    const systemMessage: SystemMessage = {
      type: "system",
      id: crypto.randomUUID(),
      text: `🟢 ${username} joined the chat`,
      timestamp: Date.now(),
    };
    io.emit("receive-message", systemMessage);
    broadcastOnlineUsers();
  });

  socket.on("send-message", (message: ChatMessage) => {
    console.log(`💬 ${message.username}: ${message.text}`);
    io.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    const username = connectedUsers.get(socket.id);
    connectedUsers.delete(socket.id);
    console.log(`❌ Client disconnected: ${socket.id}`);

    if (username) {
      const systemMessage: SystemMessage = {
        type: "system",
        id: crypto.randomUUID(),
        text: `🔴 ${username} left the chat`,
        timestamp: Date.now(),
      };
      io.emit("receive-message", systemMessage);
      broadcastOnlineUsers();
    }
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
