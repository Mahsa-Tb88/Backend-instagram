import { Request, Response } from "express";
import User from "../models/UserModels.js";
import Post from "../models/PostModel.js";
import { users } from "../data.js";

export default class UsersController {
  static async getProfile(req: Request<{ username: string }>, res: Response) {
    const username = req.params.username;
    // const user = await User.findOne({ username }).select("-password -activationCode").lean();
    const user = await User.findOne({ username });
    if (!user) {
      return res.fail("user not found", 404);
    }
    const userPostCount = await Post.countDocuments({ user: user._id });
    user.postCounts = userPostCount;
    res.success(SUCCESS_MSG, user);
  }

  static async getUsers(req: GetUsersRequest, res: Response) {
    const page = +(req.query.page ?? 1);
    const limit = +(req.query.limit ?? DEFAULT_LIMIT);
    const q = req.query.q ?? "";

    const filter = {
      $or: [{ username: RegExp(q, "i") }, { fullname: RegExp(q, "i") }],
    };

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .select(COMMON_FILED);

    const count = await User.countDocuments(filter);

    res.success(SUCCESS_MSG, { users, count });
  }
  static async getFollowers(req: GetUserFFReqquest, res: Response) {
    const page = +(req.query.page ?? 1);
    const limit = +(req.query.limit ?? DEFAULT_LIMIT);
    const username = req.params.username;

    const user = await User.findOne({ username }, "followers").lean();
    if (!user) {
      return res.fail("User not found!", 401);
    }

    const count = user.followers.length;
    const slice = user.followers.slice((page - 1) * limit, page - 1);
    const followers = await User.find({ _id: { $in: slice } }, COMMON_FILED);

    // const followers = (
    //   await User.findOne({ username }, "followers")
    //     .populate({
    //       path: "followers",
    //       select: COMMON_FILED,
    //       options: {
    //         limit,
    //         skip: (page - 1) * limit,
    //         sort: { _id: 1 },
    //       },
    //     })
    //     .lean()
    // )?.followers;

    return res.success(SUCCESS_MSG, { followers, count });
  }

  static async getFollowings(req: GetUserFFReqquest, res: Response) {
    const page = +(req.query.page ?? 1);
    const limit = +(req.query.limit ?? DEFAULT_LIMIT);
    const username = req.params.username;

    const user = await User.findOne({ username }, "following");
    if (!user) {
      return res.fail("User not found!", 401);
    }

    const count = user.following.length;
    const slice = user.following.slice((page - 1) * limit, page - 1);
    const followings = await User.find({ _id: { $in: slice } }, COMMON_FILED);
    return res.success(SUCCESS_MSG, { followings, count });
  }
}

type GetUsersRequest = Request<any, any, any, { page?: string; limit?: string; q?: string }>;
type GetUserFFReqquest = Request<{ username: string }, any, any, { page: string; limit: string }>;
