import express from "express";
import { isLoggedIn } from "../middlewares/authMiddelware.js";
import PostController from "../controllers/postController.js";
const router = express.Router();
router.get("/:id", isLoggedIn, PostController.getPostById);
