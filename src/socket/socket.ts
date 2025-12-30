import { Socket } from "dgram";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModels.js";

export function initSocketServer(s: HTTPServer) {
  const io = new SocketServer(s, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    // authorization
    const cookieString = socket.handshake.headers?.cookie ?? "";
    console.log("cookieString is", cookieString);

    const cookie = cookieString ? parse(cookieString) : {};
    console.log("cookie is ", cookie);

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
    } catch (e: any) {
      console.log(e.message);
      return socket.disconnect(true);
    }

    console.log(socket.id);
    // socket.emit("test", "hey test");
    // socket.on("ttt", (data) => {
    //   console.log(data);
    // });
  });
}
