import { posts, users } from "./data.js";
import Post from "./models/PostModel.js";
import User from "./models/UserModels.js";

export default async function insertTestData() {
  await User.deleteMany();
  await Post.deleteMany();

  await User.insertMany(users);
  await Post.insertMany(posts);
}
