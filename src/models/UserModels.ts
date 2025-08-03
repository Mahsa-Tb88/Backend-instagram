import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../types/types.js";

const objectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "This username has alreay taken"],
      validate: [
        {
          validator(v: string) {
            if (v.length < 4) {
              return false;
            }
            return true;
          },
          message: "Username must be at least 4 characters long",
        },
        {
          validator(v: string) {
            if (v.length > 16) {
              return false;
            }
            return true;
          },
          message: "Username must not exceed 16 characters",
        },
      ],
    },
    fullname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: [true, "A user already exists with this email"],
      required: [true, "Email field is required"],
      validate: {
        validator(v: string) {
          if (!/.+@.+\..+/.test(v)) {
            return false;
          }
          return true;
        },
        message: "Please enter a valid email address",
      },
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: [objectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [objectId],
      ref: "User",
      default: [],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      set(v: string) {
        if (v && v.length >= 6) {
          return bcrypt.hashSync(v, 10);
        }
      },
      validate: {
        validator(v: string) {
          if (v.length < 6) {
            return false;
          }
          return true;
        },
        message: "Password must be at least 6 charcters long",
      },
      get(v: string) {},
    },
    bio: {
      type: String,
      default: "",
    },
    activationCode: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;
