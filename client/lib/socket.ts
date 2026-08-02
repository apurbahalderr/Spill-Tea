export const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
  autoConnect: false,
});