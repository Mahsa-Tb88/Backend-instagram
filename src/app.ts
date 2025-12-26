import "dotenv/config";
import "./utils/globalConstants.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import responseMiddleware from "./middlewares/responseMiddlewares.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { checkToken } from "./middlewares/authMiddelware.js";
import insertTestData from "./insertTestData.js";
import miscRoutes from "./routes/miscRoutes.js";

const app = express();

app.use("/uploads", express.static(UPLOADS_PATH));
app.use(responseMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(checkToken);

app.use((req, res, next) => setTimeout(next, 200));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/misc", miscRoutes);

//should be end of all middlewares
app.use(errorHandler);

try {
  await mongoose.connect(MONGO_URI);
  console.log("connected to database successfully!");
} catch (error: any) {
  console.log(error.message);
  process.exit();
}

// await insertTestData();

app.listen(PORT, () => {
  console.log("server is running on http://localhost" + PORT);
});
