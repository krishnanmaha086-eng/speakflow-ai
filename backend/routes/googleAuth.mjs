import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.mjs";

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

/* Test Route */
router.get("/", (req, res) => {
  res.send("Google Auth Route Working");
});

/* Google Login Route */
router.post("/", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Credential is required",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      name,
      email,
    } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth-user",
        communicationScore: 0,
        messagesCount: 0,
        streak: 1,
      });
    }

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        communicationScore: user.communicationScore,
        messagesCount: user.messagesCount,
        streak: user.streak,
      },
    });

  } catch (error) {
    console.log("Google Auth Error:", error);

    res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
});

export default router;