import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function ResumeAnalyzer() {

    const [resumeText, setResumeText] =
        useState("");

    const [result, setResult] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    /* Analyze Resume */
    const analyzeResume = async () => {

        if (!resumeText) return;

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "http://localhost:5000/api/resume",
                    {
                        resumeText
                    }
                );

            setResult(
                response.data.reply
            );

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <Navbar />

            {/* Main Container */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">

                    📄 AI Resume Analyzer

                </h1>

                {/* Textarea */}
                <textarea
                    rows="12"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={(e) =>
                        setResumeText(
                            e.target.value
                        )
                    }
                    className="w-full bg-slate-800 p-4 md:p-6 rounded-2xl outline-none text-sm md:text-base leading-6 md:leading-7 resize-none"
                />

                {/* Analyze Button */}
                <button
                    onClick={
                        analyzeResume
                    }
                    className="mt-5 md:mt-6 bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition text-sm md:text-base w-full sm:w-auto"
                >

                    Analyze Resume

                </button>

                {/* Loading */}
                {loading && (

                    <div className="mt-6 text-sm md:text-base text-slate-300 animate-pulse">

                        AI is analyzing resume...

                    </div>

                )}

                {/* Result */}
                {result && (

                    <div className="bg-slate-800 p-5 md:p-8 rounded-2xl mt-8 md:mt-10 whitespace-pre-line leading-7 md:leading-8 text-sm md:text-base break-words">

                        {result}

                    </div>

                )}

            </div>

        </div>

    );

}

export default ResumeAnalyzer;