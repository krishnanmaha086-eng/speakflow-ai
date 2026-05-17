import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  streak: {
    type: Number,
    default: 1
  },

  communicationScore: {
    type: Number,
    default: 0
  },

  messagesCount: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

const User =
  mongoose.model("User", userSchema);

export default User;