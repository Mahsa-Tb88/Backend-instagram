import { NextFunction, Request, Response } from "express";

export default function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.success = (message = "", body = null, code = 200) => {
    res.status(code).json({
      success: true,
      body,
      message,
      code,
    });
  };

  res.fail = (message = "", code = 400, body = null) => {
    res.status(code).json({
      success: false,
      body,
      message,
      code,
    });
  };

  next();
}
