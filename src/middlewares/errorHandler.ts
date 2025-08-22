import { NextFunction, Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";

export default function errorHandler(e: Error, req: Request, res: Response, next: NextFunction) {
  console.log("error....")
  if (e instanceof mongoose.Error.ValidationError) {
    const error = Object.values(e.errors)[0];
    return res.fail(error.message);
  } else if (e instanceof MongooseError) {
    const code = (e.cause as any).code === 1100 ? 409 : 400;
    return res.fail(e.message);
  }

  res.fail(SERVER_ERR_MSG, 500);
}
