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

  static async editCommentPost(
    req: Request<{ id: string }, any, { postId: string; text: string }>,
    res: Response
  ) {
    const { postId, text } = req.body;
    const post = await Post.findById(postId, "comments");
    if (!post) {
      return res.fail("Post not found", 404);
    }
    const findComment = post.comments.id(req.params.id)!;
    console.log("fonddd", findComment, req.userId);
    if (!findComment) {
      return res.fail("Comment not found", 404);
    }

    if (req.userId !== findComment.user.toString()) {
      return res.fail(FORBIDDEN_ERR_MSG, 402);
    }

    findComment.text = text;
    await post.save();
    res.success(SUCCESS_MSG, 201);
  }
  static async deleteCommentPost(
    req: Request<{ id: string }, any, { postId: string }>,
    res: Response
  ) {
    const { postId } = req.body;
    const post = await Post.findById(postId, "comments user");
    if (!post) {
      return res.fail("Post not found", 404);
    }
    const findComment = post.comments.id(req.params.id)!;
    if (!findComment) {
      return res.fail("Comment not found", 404);
    }

    if (req.userId !== findComment.user.toString() || req.userId !== post.user.toString()) {
      return res.fail(FORBIDDEN_ERR_MSG, 402);
    }

    findComment.deleteOne();
    await post.save();
  }
}
