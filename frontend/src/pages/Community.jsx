import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Community() {

    const [post, setPost] =
        useState("");

    const [posts, setPosts] =
        useState([]);

    /* Fetch Posts */
    const fetchPosts = async () => {

        try {

            const response =
                await axios.get(
                    "https://speakflow-ai-production.up.railway.app/api/community"
                );

            setPosts(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchPosts();

    }, []);

    /* Create Post */
    const createPost = async () => {

        if (!post) return;

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            await axios.post(
                "https://speakflow-ai-production.up.railway.app/api/community",
                {
                    name: user.name,
                    post
                }
            );

            setPost("");

            fetchPosts();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            {/* Navbar */}
            <Navbar />

            {/* Main Container */}
            <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10">

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center md:text-left">

                    🌍 Community Discussion

                </h1>

                {/* Create Post */}
                <div className="bg-slate-800 p-4 md:p-6 rounded-2xl">

                    <textarea
                        rows="4"
                        placeholder="Share communication tips or ask questions..."
                        value={post}
                        onChange={(e) =>
                            setPost(
                                e.target.value
                            )
                        }
                        className="w-full bg-slate-700 p-3 md:p-4 rounded-xl outline-none text-sm md:text-base resize-none"
                    />

                    <button
                        onClick={createPost}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-5 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition w-full sm:w-auto"
                    >

                        Post

                    </button>

                </div>

                {/* Posts */}
                <div className="mt-8 md:mt-10 space-y-4 md:space-y-6">

                    {posts.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="bg-slate-800 p-4 md:p-6 rounded-2xl shadow-lg"
                            >

                                {/* Username */}
                                <h2 className="text-lg md:text-xl font-bold text-blue-400 mb-2 md:mb-3 break-words">

                                    {item.name}

                                </h2>

                                {/* Post Content */}
                                <p className="text-slate-300 leading-6 md:leading-7 text-sm md:text-base break-words whitespace-pre-line">

                                    {item.post}

                                </p>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>

    );

}

export default Community;