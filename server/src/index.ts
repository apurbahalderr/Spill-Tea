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
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});
interface Room {
  users: Map<string, string>;
}
const rooms = new Map<string, Room>();
const socketToRoom = new Map<string, string>();
function broadcastOnlineUsers(roomCode: string) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const usernames = Array.from(room.users.values());
  io.to(roomCode).emit("online-users", usernames);
}
function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars like O/0, I/1
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on("typing", (username: string) => {
    const roomCode = socketToRoom.get(socket.id);
    if (!roomCode) return;
    socket.to(roomCode).emit("typing", username);
  });

  socket.on("stop-typing", (username: string) => {
    const roomCode = socketToRoom.get(socket.id);
    if (!roomCode) return;
    socket.to(roomCode).emit("stop-typing", username);
  });
  socket.on("create-room", (username: string) => {
    const roomCode = generateRoomCode();
    rooms.set(roomCode, { users: new Map([[socket.id, username]]) });
    socket.join(roomCode);
    socketToRoom.set(socket.id, roomCode);
    console.log(`🆕 Room created: ${roomCode} by ${username}`);
    socket.emit("room-created", roomCode);
    const joinMessage: SystemMessage = {
      type: "system",
      id: crypto.randomUUID(),
      text: `🟢 ${username} joined the room`,
      timestamp: Date.now(),
    };
    socket.to(roomCode).emit("receive-message", joinMessage);
    broadcastOnlineUsers(roomCode);
  });
  socket.on(
    "join-room",
    ({ roomCode, username }: { roomCode: string; username: string }) => {
      const room = rooms.get(roomCode);
      if (room) {
        room.users.set(socket.id, username);
        socket.join(roomCode);
        socketToRoom.set(socket.id, roomCode);
        console.log(`🔑 ${username} joined room: ${roomCode}`);
        socket.emit("room-joined", roomCode);
        const joinMessage: SystemMessage = {
          type: "system",
          id: crypto.randomUUID(),
          text: `🟢 ${username} joined the room`,
          timestamp: Date.now(),
        };
        socket.to(roomCode).emit("receive-message", joinMessage);
        broadcastOnlineUsers(roomCode);
      } else {
        console.log(`❌ Room not found: ${roomCode}`);
        socket.emit("room-not-found", roomCode);
      }
    },
  );
  socket.on("get-online-users", () => {
    const roomCode = socketToRoom.get(socket.id);
    if (!roomCode) return;
    broadcastOnlineUsers(roomCode);
  });

  socket.on("send-message", (message: ChatMessage) => {
    const roomCode = socketToRoom.get(socket.id);
    if (!roomCode) return;

    console.log(`💬 [${roomCode}] ${message.username}: ${message.text}`);
    io.to(roomCode).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    const roomCode = socketToRoom.get(socket.id);
    if (!roomCode) return;

    const room = rooms.get(roomCode);
    if (!room) return;

    const username = room.users.get(socket.id);
    room.users.delete(socket.id);
    socketToRoom.delete(socket.id);

    if (username) {
      const systemMessage: SystemMessage = {
        type: "system",
        id: crypto.randomUUID(),
        text: `🔴 ${username} left the room`,
        timestamp: Date.now(),
      };
      io.to(roomCode).emit("receive-message", systemMessage);
      broadcastOnlineUsers(roomCode);
    }
    if (room.users.size === 0) {
      rooms.delete(roomCode);
      console.log(`🗑️ Room ${roomCode} deleted (empty)`);
    }
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
