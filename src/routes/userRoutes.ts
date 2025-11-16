import express from "express";
import UsersController from "../controllers/UsersController.js";
import { isLoggedIn } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get("/:username", isLoggedIn, UsersController.getProfile);
router.get("/", isLoggedIn, UsersController.getUsers);
router.get("/search/findUser/", UsersController.getuserSearch);
router.get("/:username/followers", isLoggedIn, UsersController.getFollowers);
router.get("/:username/following", isLoggedIn, UsersController.getFollowings);
router.put("/:id/profile", isLoggedIn, UsersController.updateProfile);
router.put("/:id/follow", isLoggedIn, UsersController.followUser);
router.put("/:id/unfollow", isLoggedIn, UsersController.unfollowUser);

export default router;
