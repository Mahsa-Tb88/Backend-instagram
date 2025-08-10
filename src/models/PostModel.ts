import mongoose from "mongoose";

const ObjectId = mongoose.Schema.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Commment can not be empty!"],
      validate: {
        validator(v: string) {
          if (v.length > 500) {
            return false;
          }
          return true;
        },
      },
      message: "Comment must not exceed 500 characters!",
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Each comment must belong to a user!"],
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      validate: {
        validator(v: string) {
          if (v.length > 500) {
            return false;
          }
          return true;
        },
        message: "Caption must not exceed 500 charcters",
      },
      default: "",
    },
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: [true, "Each post must belong to a user!"],
    },
    likes: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
