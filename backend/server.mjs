import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import Chat from "./models/Chat.mjs";
import User from "./models/User.mjs";
import Community from "./models/Community.mjs";


import googleAuthRoutes from "./routes/googleAuth.mjs";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/google-auth", googleAuthRoutes);

/* Groq Setup */
const groq = new Groq({

    apiKey: process.env.GROQ_API_KEY,

});

/* Home Route */
app.get("/", (req, res) => {

    res.send("Backend Running");

});

/* Auth Routes */
app.use("/api/auth", authRoutes);

/* Chat Route */
app.post("/api/chat", async (req, res) => {

    try {

        const {
            message,
            mode,
            user: storedUser
        } = req.body;

        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: "system",

                        content: `

You are an advanced AI Communication Coach.

If mode is "interview":

- Act like a professional HR interviewer
- Ask interview questions one by one
- Evaluate communication skills
- Give communication score out of 10
- Correct grammar politely
- Suggest professional answers
- Evaluate confidence level
- Encourage the user
- Continue interview naturally
- Keep answers professional and structured

If mode is "speaking":

- Analyze speaking communication
- Give pronunciation score out of 10
- Give fluency score out of 10
- Give confidence score out of 10
- Correct grammar politely
- Suggest better professional English
- Encourage the user
- Keep feedback short and professional

If mode is "normal":
- Help improve communication
- Correct grammar
- Teach professional English
- Motivate the user

`
                    },

                    {
                        role: "user",

                        content: `

Mode: ${mode}

User Message:
${message}

`
                    }

                ],

                model: "llama-3.3-70b-versatile",

            });

        const reply =
            completion.choices[0]?.message?.content;

        /* Save Chat */
        await Chat.create({

            message,
            reply

        });

        /* Update User Score */
        if (storedUser?.id) {

            const user =
                await User.findById(
                    storedUser.id
                );

            if (user) {

                user.messagesCount += 1;

                user.communicationScore =
                    Math.min(
                        100,
                        user.communicationScore + 2
                    );

                await user.save();

            }

        }

        res.json({
            reply
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            reply:
                "AI service temporarily unavailable."

        });

    }

});

/* Get Chat History */
app.get("/api/chats", async (req, res) => {

    try {

        const chats =
            await Chat.find()
                .sort({
                    createdAt: -1
                });

        res.json(chats);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Failed to fetch chats"

        });

    }

});

/* Get User Profile */
app.get("/api/user/:id", async (req, res) => {

    try {

        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }

        res.json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server Error"

        });

    }

});

/* Resume Analyzer */
app.post("/api/resume", async (req, res) => {

    try {

        const { resumeText } = req.body;

        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: "system",

                        content: `

You are an AI Resume Communication Expert.

Your job:
- Improve resume communication
- Correct grammar
- Make wording professional
- Suggest improvements
- Improve interview readiness
- Keep response structured

`
                    },

                    {
                        role: "user",

                        content: resumeText
                    }

                ],

                model: "llama-3.3-70b-versatile",

            });

        const reply =
            completion.choices[0]?.message?.content;

        res.json({
            reply
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            reply:
                "Resume analysis failed."

        });

    }

});

/* Daily Vocabulary */
app.get("/api/vocabulary", async (req, res) => {

    try {

        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: "system",

                        content: `

You are an English Vocabulary Coach.

Generate:
- One advanced English word
- Meaning
- Professional example sentence
- One small speaking challenge

Keep it clean and professional.

`
                    }

                ],

                model: "llama-3.3-70b-versatile",

            });

        const reply =
            completion.choices[0]?.message?.content;

        res.json({
            reply
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            reply:
                "Failed to load vocabulary."

        });

    }

});

/* Create Community Post */
app.post("/api/community", async (req, res) => {

    try {

        const { name, post } = req.body;

        await Community.create({
            name,
            post
        });

        res.json({
            message: "Post created"
        });

    } catch (error) {

        console.log(error);

    }

});

/* Get Community Posts */
app.get("/api/community", async (req, res) => {

    try {

        const posts =
            await Community.find()
                .sort({
                    createdAt: -1
                });

        res.json(posts);

    } catch (error) {

        console.log(error);

    }

});

/* Delete All Chats */
app.delete("/api/chats", async (req, res) => {

    try {

        await Chat.deleteMany({});

        res.json({
            message: "All chats deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete chats"
        });

    }

});

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});