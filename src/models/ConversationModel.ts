import mongoose from "mongoose";
import { version } from "os";
import { ConversationType } from "../types/types.js";

const ObjectId = mongoose.Schema.ObjectId;
const conversationSchema = new mongoose.Schema<ConversationType>(
  {
    from: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    lastMessage: {
      type: ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Conversation = mongoose.model<ConversationType>("Conversation", conversationSchema);
export default Conversation;
