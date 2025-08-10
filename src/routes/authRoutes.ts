import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/activate", AuthController.activate);
router.post("/login", AuthController.activate);
router.post("/logout", AuthController.activate);

export default router;
