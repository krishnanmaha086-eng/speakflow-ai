import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const [userData, setUserData] =
        useState(null);

    const [streak, setStreak] =
        useState(1);

    /* Logged User */
    const storedUser =
        JSON.parse(
            localStorage.getItem("user")
        );

    /* Fetch User Data */
    const fetchUser = async () => {

    try {

        if (!storedUser?._id) {
            console.log("User ID missing");
            return;
        }

        const response = await axios.get(
            `https://speakflow-ai-production.up.railway.app/api/user/${storedUser._id}`
        );

        setUserData(response.data);

    } catch (error) {

        console.log(error);

    }

};

    /* Streak Logic */
    useEffect(() => {

        const lastVisit =
            localStorage.getItem(
                "lastVisit"
            );

        const today =
            new Date().toDateString();

        if (
            lastVisit !== today
        ) {

            const currentStreak =
                Number(
                    localStorage.getItem(
                        "streak"
                    )
                ) || 0;

            const newStreak =
                currentStreak + 1;

            localStorage.setItem(
                "streak",
                newStreak
            );

            localStorage.setItem(
                "lastVisit",
                today
            );

            setStreak(
                newStreak
            );

        } else {

            const savedStreak =
                Number(
                    localStorage.getItem(
                        "streak"
                    )
                ) || 1;

            setStreak(
                savedStreak
            );

        }

        fetchUser();

    }, []);

    /* Loading */
    if (!userData) {

        return (

            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">

                Loading...

            </div>

        );

    }

    /* Level Logic */
    let level =
        "Beginner";

    if (
        userData.communicationScore > 70
    ) {

        level =
            "Professional";

    } else if (
        userData.communicationScore > 40
    ) {

        level =
            "Advanced";

    } else if (
        userData.communicationScore > 20
    ) {

        level =
            "Intermediate";

    }

    /* Chart Data */
    const analyticsData = [

        {
            day: "Mon",
            score: 10
        },

        {
            day: "Tue",
            score: 20
        },

        {
            day: "Wed",
            score: 35
        },

        {
            day: "Thu",
            score: 45
        },

        {
            day: "Fri",
            score: 60
        },

        {
            day: "Sat",
            score: 75
        },

        {
            day: "Sun",
            score:
                userData.communicationScore
        }

    ];

    /* Badges */
    const badges = [];

    if (
        userData.messagesCount >= 5
    ) {

        badges.push(
            "🎤 Beginner Speaker"
        );

    }

    if (
        userData.messagesCount >= 20
    ) {

        badges.push(
            "💬 Confident Communicator"
        );

    }

    if (
        userData.messagesCount >= 50
    ) {

        badges.push(
            "🚀 Professional Speaker"
        );

    }

    if (streak >= 7) {

        badges.push(
            "🔥 Consistency Master"
        );

    }

    if (
        userData.communicationScore >= 100
    ) {

        badges.push(
            "🏆 Communication Expert"
        );

    }

    /* Weekly Report */
    const weeklyReport = `

Messages Practiced:
${userData.messagesCount}

Communication Score:
${userData.communicationScore}%

Strengths:
- Consistent practice
- Good communication confidence

Needs Improvement:
- Grammar structure
- Professional English usage

AI Suggestion:
Practice speaking slowly and use complete sentences daily.

`;

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <Navbar />

            <div className="p-4 md:p-8 lg:p-10">

                {/* Welcome Card */}
                <div className="bg-slate-800 p-5 md:p-8 rounded-2xl shadow-lg">

                    <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 break-words">

                        Welcome Back,
                        {" "}
                        {userData.name}
                        {" "}
                        👋

                    </h1>

                    <p className="text-slate-300 text-sm md:text-lg leading-7">

                        Keep practicing daily to improve your communication skills.

                    </p>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">

                    {/* Score */}
                    <div className="bg-slate-800 p-5 md:p-6 rounded-2xl">

                        <h2 className="text-lg md:text-xl font-semibold mb-2">

                            Communication Score

                        </h2>

                        <p className="text-3xl md:text-4xl font-bold text-blue-400">

                            {userData.communicationScore}%

                        </p>

                    </div>

                    {/* Messages */}
                    <div className="bg-slate-800 p-5 md:p-6 rounded-2xl">

                        <h2 className="text-lg md:text-xl font-semibold mb-2">

                            Messages Practiced

                        </h2>

                        <p className="text-3xl md:text-4xl font-bold text-green-400">

                            {userData.messagesCount}

                        </p>

                    </div>

                    {/* Level */}
                    <div className="bg-slate-800 p-5 md:p-6 rounded-2xl">

                        <h2 className="text-lg md:text-xl font-semibold mb-2">

                            Current Level

                        </h2>

                        <p className="text-2xl md:text-3xl font-bold text-yellow-400">

                            {level}

                        </p>

                    </div>

                    {/* Streak */}
                    <div className="bg-slate-800 p-5 md:p-6 rounded-2xl">

                        <h2 className="text-lg md:text-xl font-semibold mb-2">

                            Practice Streak

                        </h2>

                        <p className="text-3xl md:text-4xl font-bold text-red-400">

                            🔥 {streak}

                        </p>

                    </div>

                </div>

                {/* Chart */}
                <div className="bg-slate-800 p-4 md:p-8 rounded-2xl mt-6 md:mt-8">

                    <h2 className="text-2xl font-bold mb-6">

                        📈 Weekly Progress

                    </h2>

                    <div className="w-full h-[300px] md:h-[400px]">

                        <ResponsiveContainer width="100%" height="100%">

                            <LineChart
                                data={analyticsData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#475569"
                                />

                                <XAxis
                                    dataKey="day"
                                    stroke="#cbd5e1"
                                />

                                <YAxis
                                    stroke="#cbd5e1"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Badges */}
                <div className="bg-slate-800 p-5 md:p-8 rounded-2xl mt-6 md:mt-8">

                    <h2 className="text-2xl font-bold mb-6">

                        🏆 Achievements

                    </h2>

                    <div className="flex flex-wrap gap-3 md:gap-4">

                        {badges.length > 0 ? (

                            badges.map(
                                (
                                    badge,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="bg-slate-700 px-4 py-3 rounded-xl text-sm md:text-base"
                                    >

                                        {badge}

                                    </div>

                                )
                            )

                        ) : (

                            <p className="text-slate-300">

                                No badges earned yet.

                            </p>

                        )}

                    </div>

                </div>

                {/* Weekly Report */}
                <div className="bg-slate-800 p-5 md:p-8 rounded-2xl mt-6 md:mt-8">

                    <h2 className="text-2xl font-bold mb-6">

                        📄 AI Weekly Report

                    </h2>

                    <pre className="whitespace-pre-wrap leading-7 text-slate-300 text-sm md:text-base break-words">

                        {weeklyReport}

                    </pre>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;