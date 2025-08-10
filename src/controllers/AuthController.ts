import { CookieOptions, Request, Response } from "express";
import User from "../models/UserModels.js";
import { sendActivationMail } from "../utils/mailing.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class AuthController {
  static async register(req: RegisterRequest, res: Response) {
    console.log("yees");
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
      await user.save();
      res.success("User activated Successfully!");
    } else {
      res.fail("Invalid Request");
    }
  }

  static async login(req: LoginRequest, res: Response) {
    const { username, password, remember } = req.body;
    if (!username || !password) {
      return res.fail("Please enter username and password!");
    }
    const user = await User.findOne({ username }).select(COMMON_FILED + " activationCode password");
    if (!user) {
      return res.fail("Username or password is not valid!");
    }

    const match = bcrypt.compare(password, user.password!);
    if (!match) {
      return res.fail("Username or password is not valid!");
    }

    if (user.activationCode) {
      return res.fail("User is not activated!");
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: remember ? "7d" : "4h" });

    const settings: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    };
    if (remember) {
      settings.maxAge = 7 * 86400 * 1000;
    }
    res.cookie("token", token, settings);

    const suggested = await User.aggregate([
      { $match: { _id: { $ne: user._id }, fallowers: { $nin: [user._id] } } },
      {
        $project: { username: 1, fullname: 1, profilePicture: 1 },
      },
      { $sample: { size: 8 } },
    ]);
    res.success("user logined successfully!", { user, suggested });
  }
  static async logou(req: LoginRequest, res: Response) {}
}

type RegisterRequest = Request<
  any,
  any,
  { username: string; password: string; email: string; fullname?: string }
>;

type ActivateReques = Request<any, any, { username: string; activationCode: number }>;
type LoginRequest = Request<any, any, { username: string; password: string; remember?: boolean }>;
