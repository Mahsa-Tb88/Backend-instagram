import { conversations, messages, posts, users } from "./data.js";

import Conversation from "./models/ConversationModel.js";
import Message from "./models/MessageModel.js";
import Post from "./models/PostModel.js";
import User from "./models/UserModel.js";

export default async function insertTestData() {
  await User.deleteMany();
  await Post.deleteMany();
  await Conversation.deleteMany();
  await Message.deleteMany();
  await User.insertMany(users);
  await Post.insertMany(posts);
  await Conversation.insertMany(conversations);
  await Message.insertMany(messages);
}
