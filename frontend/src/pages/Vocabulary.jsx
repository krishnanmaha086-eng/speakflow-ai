import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Vocabulary() {

    const [wordData, setWordData] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    /* Fetch Vocabulary */
    const fetchVocabulary = async () => {

        try {

            setLoading(true);

            const response =
                await axios.get(
                    "http://localhost:5000/api/vocabulary"
                );

            setWordData(
                response.data.reply
            );

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchVocabulary();

    }, []);

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <Navbar />

            {/* Main Container */}
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">

                    📚 Daily Vocabulary Builder

                </h1>

                {/* Loading */}
                {loading ? (

                    <div className="bg-slate-800 p-5 md:p-8 rounded-2xl animate-pulse">

                        <p className="text-sm md:text-base text-slate-300">

                            Loading daily vocabulary...

                        </p>

                    </div>

                ) : (

                    /* Vocabulary Card */
                    <div className="bg-slate-800 p-5 md:p-8 rounded-2xl whitespace-pre-line leading-7 md:leading-8 text-sm md:text-base break-words shadow-lg">

                        {wordData}

                    </div>

                )}

                {/* Refresh Button */}
                <button
                    onClick={
                        fetchVocabulary
                    }
                    className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 md:px-6 py-3 rounded-xl font-semibold transition text-sm md:text-base w-full sm:w-auto"
                >

                    Load New Vocabulary

                </button>

            </div>

        </div>

    );

}

export default Vocabulary;