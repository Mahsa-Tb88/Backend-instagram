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

  static async activate(req: ActivateReques, res: Response) {
    const { username, activationCode } = req.body;

    if (username && activationCode) {
      const user = await User.findOne({ username, activationCode });

      if (!user) {
        return res.fail("Invalid Username or activation code");
      }
      user.activationCode = 0;
      user.save();
      res.success("User activated Successfully!");
    } else {
      res.fail("Invalid Request");
    }
  }
}

type RegisterRequest = Request<
  any,
  any,
  { username: string; password: string; email: string; fullname?: string }
>;

type ActivateReques = Request<any, any, { username: string; activationCode: number }>;
