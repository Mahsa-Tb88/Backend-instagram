import "dotenv/config";
import "./utils/globalConstants.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import responseMiddleware from "./middlewares/responseMiddlewares.js";

const app = express();

app.use("/uploads", express.static(UPLOADS_PATH));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(responseMiddleware);

try {
  await mongoose.connect(MONGO_URI);
  console.log("connected to database successfully!");
} catch (error: any) {
  console.log(error.message);
  process.exit();
}

app.listen(PORT, () => {
  console.log("server is running on http://localhost" + PORT);
});
