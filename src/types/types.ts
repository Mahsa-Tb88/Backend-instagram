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
};
