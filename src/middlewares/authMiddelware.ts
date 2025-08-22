import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/UserModels.js";

export async function checkToken(req: Request, res: Response, next: NextFunction) {
  if (req.cookies?.token) {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        req.userId = user._id.toString();
        req.username = user.username;
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  next();
}

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.username) {
    next();
  } else {
    res.fail(UNAUTH_ERR_MSG, 401);
  }
}
