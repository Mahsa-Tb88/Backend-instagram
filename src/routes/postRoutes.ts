import express from "express";
import { isLoggedIn } from "../middlewares/authMiddelware.js";
import PostController from "../controllers/postController.js";

const router = express.Router();

router.get("/:id", isLoggedIn, PostController.getPostById);
router.put("/:id", isLoggedIn, PostController.editCommentPost);
router.delete("/comment/:id", isLoggedIn, PostController.deleteCommentPost);
router.post("/comment/:id", isLoggedIn, PostController.editPost);
router.get("/user/feed", isLoggedIn, PostController.getFeedPost);
router.get("/:username/posts", isLoggedIn, PostController.getUserPosts);
router.put("/:id/like", isLoggedIn, PostController.likePost);
router.put("/:id/unlike", isLoggedIn, PostController.unlikePost);
router.post("/", isLoggedIn, PostController.createPost);
router.post("/:id/comment", isLoggedIn, PostController.insertComment);
router.delete("/:id", isLoggedIn, PostController.deletePost);

export default router;
