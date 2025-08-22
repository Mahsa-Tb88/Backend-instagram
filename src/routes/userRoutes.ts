import express from "express";
import UsersController from "../controllers/UsersController.js";
import { isLoggedIn } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get("/:username", isLoggedIn, UsersController.getProfile);
router.get("/", isLoggedIn, UsersController.getUsers);
router.get("/username/followers", isLoggedIn, UsersController.getFollowers);
router.get("/username/following", isLoggedIn, UsersController.getFollowings);
export default router;
