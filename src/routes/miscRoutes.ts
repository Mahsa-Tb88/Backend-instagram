import express from "express";
import MiscController from "../controllers/miscController.js";

const router = express.Router();

router.get("/init", MiscController.init);

export default router;
