import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";

export function initSocketServer(s: HTTPServer) {
  const io = new SocketServer(s, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    console.log(socket.id);
    socket.emit("test", "hey test");
    socket.on("ttt", (data) => {
      console.log(data);
    });
  });
}
