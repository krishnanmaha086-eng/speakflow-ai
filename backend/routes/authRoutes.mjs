import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.mjs";

const router = express.Router();

/* Register */
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword

    });

    res.status(201).json({

      message: "User Registered Successfully",
      user

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* Login */
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    res.status(200).json({

      message: "Login Successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;