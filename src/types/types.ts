import { Types } from "mongoose";

type ObjectId = Types.ObjectId;

export type UserType = {
  _id: ObjectId;
  username: string;
  password?: string;
  fullname: string;
  profilePicture: string;
  email: string;
  followers: ObjectId[];
  following: ObjectId[];
  bio: string;
  activationCode?: number;
  postCounts?: number;
  save: () => Promise<void>;
};

export type CommentType = {
  _id: ObjectId;
  text: string;
  user: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PostType = {
  _id: ObjectId;
  caption: string;
  image: string;
  user: ObjectId;
  likes: ObjectId[];
  // comments: CommentType[];
  comments: Types.DocumentArray<CommentType>;
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationType = {
  _id: ObjectId;
  from: ObjectId;
  to: ObjectId;
  lastMessage: ObjectId | null;
};

export type MessageType = {
  _id: ObjectId;
  sender: ObjectId;
  conversation: ObjectId;
  text: string;
  seen: boolean;
};
