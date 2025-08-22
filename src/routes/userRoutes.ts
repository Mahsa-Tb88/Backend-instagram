import express from "express";
import UsersController from "../controllers/UsersController.js";
import { isLoggedIn } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get("/:username", isLoggedIn, UsersController.getProfile);
export default router;
