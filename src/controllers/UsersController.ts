import { Request, Response } from "express";
import User from "../models/UserModels.js";

export default class UsersController {
  static async getProfile(req: Request<{ username: string }>, res: Response) {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.fail("user not found", 404);
    }
    res.success(SUCCESS_MSG, user);
  }
}
