import { ObjectId } from "mongoose";

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
};
