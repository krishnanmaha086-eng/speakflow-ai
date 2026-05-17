import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true
  },

  reply: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const Chat =
  mongoose.model("Chat", chatSchema);

export default Chat;