import express from "express";
import fs from "fs";
import multer from "multer";
import { extname } from "path";
import MiscController from "../controllers/MiscController.js";
import { isLoggedIn } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get("/init", MiscController.init);

const allowedExtension = [".jpg", ".png", ".jpeg", ".webp"];
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const ext = extname(file.originalname).toLowerCase();
    if (!allowedExtension.includes(ext)) {
      const err = new Error("Invalid file type");
      return cb(err, " ");
    }
  },
  filename(req, file, cb) {},
});

const uploader = multer({ storage, limits: { fileSize: MAX_UPLOAD_SIZE } });

router.post("/upload", isLoggedIn, uploader.single("file"), MiscController.uploadFile);
export default router;
