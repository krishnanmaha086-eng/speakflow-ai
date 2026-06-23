import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.mjs";

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

router.post("/", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google-auth-user",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
});

export default router;