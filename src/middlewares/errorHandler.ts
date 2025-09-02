import { NextFunction, Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import { MulterError } from "multer";

export default function errorHandler(e: Error, req: Request, res: Response, next: NextFunction) {
  console.log("error....");
  if (e.type) {
    return res.fail(e.message);
  } else if (e instanceof MulterError && e.code === "LIMIT_FILE_SIZE") {
    return res.fail(
      "File can not be larger than " + (MAX_UPLOAD_SIZE / 1024 / 1024).toFixed(1) + " MB"
    );
  } else if (e instanceof MulterError && e.code == "LIMIT_UNEXPECTED_FILE") {
    return res.fail("Only one file can be uploaded!");
  } else if (e instanceof mongoose.Error.ValidationError) {
    const error = Object.values(e.errors)[0];
    return res.fail(error.message);
  } else if (e instanceof MongooseError) {
    const code = (e.cause as any).code === 1100 ? 409 : 400;
    return res.fail(e.message);
  }
  console.log(e);
  res.fail(SERVER_ERR_MSG, 500);
}
