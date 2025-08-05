import { Request, Response } from "express";
import User from "../models/UserModels.js";
import { sendActivationMail } from "../utils/mailing.js";

export default class AuthController {
  static async register(req: RegisterRequest, res: Response) {
    const { username, password, email, fullname } = req.body;
    const activationCode = Math.floor(Math.random() * 900000 + 100000);
    const user = await User.create({
      username,
      password,
      email,
      fullname,
      activationCode,
    });
    try {
      await sendActivationMail(email, username, activationCode);
    } catch (error) {
      await user.deleteOne();
      return res.fail("Activation code could not be sent", 500);
    }

    res.success("user created successfully! ", user, 201);
  }
}

type RegisterRequest = Request<
  any,
  any,
  { username: string; password: string; email: string; fullname?: string }
>;
