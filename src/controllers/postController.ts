import { Request, Response } from "express";

export default class PostController {
  static async getPostById(req: Request<{ id: string }>, res: Response) {}
}
