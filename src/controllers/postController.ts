import { Request, Response } from "express";
import Post from "../models/PostModel.js";

export default class PostController {
  static async getPostById(req: Request<{ id: string }>, res: Response) {
    const post = await Post.findById(req.params.id)
      .populate("user", COMMON_FILED)
      .populate("comments.user", COMMON_FILED);

    if (!post) {
      return res.fail("Post not found", 404);
    }
    res.success(SUCCESS_MSG, post);
  }
}
