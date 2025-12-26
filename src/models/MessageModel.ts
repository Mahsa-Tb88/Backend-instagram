import mongoose from "mongoose";
import { MessageType } from "../types/types.js";

const ObjectId = mongoose.Schema.ObjectId;

const messageSchema = new mongoose.Schema<MessageType>(
  {
    sender: {
      type: ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    conversation: {
      type: ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    text: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Message = mongoose.model<MessageType>("Message", messageSchema);
export default Message;
