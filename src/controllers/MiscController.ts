import { Request, Response } from "express";
import User from "../models/UserModels.js";

export default class MiscController {
  
  static async init(req: Request, res: Response) {
    if (!req.userId) {
      return res.success(SUCCESS_MSG, { user: null, suggested: [] });
    }

    const user = (await User.findById(req.userId, COMMON_FILED))!;
    const suggested = await User.aggregate([
      {
        $match: { _id: { $ne: user._id }, followers: { $nin: [user._id] } },
      },
      {
        $project: { username: 1, fullname: 1, profilePicture: 1 },
      },
      {
        $sample: { size: 8 },
      },
    ]);

    res.success(SUCCESS_MSG, { user, suggested });
  }

  static async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.fail("No file uploaded");
    }

    const { filename } = req.file;
    res.success("File uploaded successfully!", { filename, url: UPLOADS_FOLDER + "/" + filename });
  }
}
