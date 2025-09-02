import { Request, Response } from "express";
import Post from "../models/PostModel.js";
import User from "../models/UserModels.js";

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
    res.success(SUCCESS_MSG, 201);
  }

  static async getFeedPost(req: GetFeedRequest, res: Response) {
    const page = +(req.query.page ?? 1);
    const limit = +(req.query.limit ?? 1);

    const followings = req.user?.following;
    const posts = await Post.find({ user: { $in: followings } })
      .populate("user", COMMON_FILED)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Post.countDocuments({ user: { $in: followings } });

    res.success(SUCCESS_MSG, { posts, count });
  }

  static async getUserPosts(req: GetUserPostsRequest, res: Response) {
    const page = +(req.query.page ?? 1);
    const limit = +(req.query.limit ?? DEFAULT_LIMIT);
    const username = req.params.username;

    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.fail("User not found", 404);
    }

    const posts = await Post.find({ user: user._id })
      .populate("user", COMMON_FILED)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    const count = await Post.countDocuments({ user: user._id });
    res.success(SUCCESS_MSG, { posts, count });
  }

  static async likePost(req: Request<{ id: string }>, res: Response) {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.fail("Post not found", 44);
    }

    if (post.likes.includes(userId as any)) {
      post.likes.push(userId as any);
    }

    await post.save();
    res.success(SUCCESS_MSG, 201);
  }

  static async unlikePost(req: Request<{ id: string }>, res: Response) {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.fail("Post not found", 44);
    }

    post.likes = post.likes.filter((p) => p.toString() !== userId);

    await post.save();
    res.success(SUCCESS_MSG, 201);
  }

  static async createPost(req: CreatePostRequest, res: Response) {
    const userId = req.userId;
    const { caption, image } = req.body;
    const post = await Post.create({ caption, image, user: userId });
    res.success("New post was created successfully!", post, 201);
  }

  static async insertComment(req: InsertCommetRequest, res: Response) {
    const postId = req.params.id;
    const userId = req.userId;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.fail("Post not found", 404);
    }

    post?.comments.push({ user: userId, text });
    await post.save();
    res.success(SUCCESS_MSG, 201);
  }
}

type GetFeedRequest = Request<any, any, any, { page?: string; limit?: string }>;
type GetUserPostsRequest = Request<
  { username: string },
  any,
  any,
  { page?: string; limit?: string }
>;

type CreatePostRequest = Request<any, any, { caption: string; image: string }>;
type InsertCommetRequest = Request<any, any, { id: string; text: string }>;
