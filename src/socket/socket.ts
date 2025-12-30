import { Socket } from "dgram";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModels.js";
import { OnlineUsers, TypingUsers } from "../types/types.js";

export function initSocketServer(s: HTTPServer) {
  const onlineUsers: OnlineUsers = {};
  const typingUsers: TypingUsers = {};
  const io = new SocketServer(s, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    // authorization
    const cookieString = socket.handshake.headers?.cookie ?? "";
    const cookie = cookieString ? parse(cookieString) : {};
    if (!cookie.token) {
      console.log("No token");
      return socket.disconnect(true);
    }

    try {
      const payload = jwt.verify(cookie.token, SECRET_KEY) as JwtPayload;
      const user = await User.findById(payload.id);
      if (!user) {
        console.log("No user");
        return socket.disconnect(true);
      }

      socket.userId = payload.id;
      onlineUsers[payload.id] = socket;
    } catch (e: any) {
      console.log(e.message);
      return socket.disconnect(true);
    }
    socket.on("disconnet", () => {
      delete onlineUsers[socket.userId];
      delete typingUsers[socket.userId];
    });
  });
}
