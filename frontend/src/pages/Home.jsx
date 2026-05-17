import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function Home() {

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <div className="text-center py-16 md:py-24 px-4 md:px-6">

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">

                    Improve Your
                    <span className="text-blue-500">
                        {" "}Communication Skills
                    </span>
                    {" "}with AI

                </h1>

                <p className="text-slate-300 text-base md:text-xl mt-6 md:mt-8 max-w-3xl mx-auto leading-7 md:leading-9">

                    SpeakFlow AI helps you improve spoken English,
                    communication confidence, interview preparation,
                    professional speaking, and vocabulary using AI-powered learning.

                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8 md:mt-10">

                    <Link
                        to="/chat"
                        className="bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold transition cursor-pointer"
                    >

                        Start Practicing

                    </Link>

                    <Link
                        to="/dashboard"
                        className="bg-slate-700 hover:bg-slate-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold transition cursor-pointer"
                    >

                        View Dashboard

                    </Link>

                </div>

            </div>

            {/* Features */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-20">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">

                    🚀 Platform Features

                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* AI Chat */}
                    <Link
                        to="/chat"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            💬 AI Communication Coach

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Practice communication, grammar,
                            confidence building, and spoken English with AI.

                        </p>

                    </Link>

                    {/* Dashboard */}
                    <Link
                        to="/dashboard"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            📊 Analytics Dashboard

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Track communication score,
                            streaks, achievements, and learning growth.

                        </p>

                    </Link>

                    {/* Resume */}
                    <Link
                        to="/resume"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            📄 Resume Analyzer

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Improve resume communication,
                            grammar, and professional wording using AI.

                        </p>

                    </Link>

                    {/* Vocabulary */}
                    <Link
                        to="/vocabulary"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            📚 Vocabulary Builder

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Learn advanced English vocabulary daily
                            with professional examples and challenges.

                        </p>

                    </Link>

                    {/* Certificate */}
                    <Link
                        to="/certificate"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            🏆 Certificates

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Download communication achievement
                            certificates and showcase your learning progress.

                        </p>

                    </Link>

                    {/* Community */}
                    <Link
                        to="/community"
                        className="bg-slate-800 hover:bg-slate-700 p-6 md:p-8 rounded-2xl transition shadow-lg"
                    >

                        <h3 className="text-xl md:text-2xl font-bold mb-4">

                            🌍 Community Discussions

                        </h3>

                        <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base">

                            Share communication tips,
                            ask questions, and interact with learners.

                        </p>

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Home;