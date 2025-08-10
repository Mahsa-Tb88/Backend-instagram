import express from "express";
import UsersController from "../controllers/UsersController.js";

const router = express.Router();

router.get("/:username", UsersController.getProfile);
export default router;
