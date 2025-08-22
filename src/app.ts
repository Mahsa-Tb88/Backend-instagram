import "dotenv/config";
import "./utils/globalConstants.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import responseMiddleware from "./middlewares/responseMiddlewares.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import {checkToken} from "./middlewares/authMiddelware.js";
import insertTestData from "./insertTestData.js";

const app = express();

app.use("/uploads", express.static(UPLOADS_PATH));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(responseMiddleware);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use(checkToken);
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
