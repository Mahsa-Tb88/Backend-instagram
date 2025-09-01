import express from "express";
import { isLoggedIn } from "../middlewares/authMiddelware.js";
import PostController from "../controllers/postController.js";

const router = express.Router();

router.get("/:id", isLoggedIn, PostController.getPostById);
router.put("/:id", isLoggedIn, PostController.editCommentPost);
router.delete("/:id", isLoggedIn, PostController.deleteCommentPost);
router.get("/user/feed", isLoggedIn, PostController.getFeedPost);

export default router;
