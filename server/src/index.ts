import cors from "cors";
import express from "express";
import {createServer} from "http";
import{Server} from "socket.io";

const app = express();
app.use(cors())
const httpServer = createServer(app)
const io = new Server(httpServer , {
  cors:{
    origin: "http://localhost:3000",
    methods : ["GET", "POST"]
  }
})
io.on("connection", (socket)=>{
  console.log(`User connected: ${socket.id}`)
  socket.on("disconnect", ()=>{
    console.log(`User disconnected: ${socket.id}`)
  })
})
const port = process.env.PORT || 4000
httpServer.listen(port, ()=>{
  console.log(`Server is running on port http://localhost:${port}`)
})
