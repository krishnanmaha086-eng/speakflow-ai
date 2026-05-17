import { useState, useEffect, useRef } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Chat() {

    const messagesEndRef =
        useRef(null);

    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [mode, setMode] =
        useState("normal");

    const [listening, setListening] =
        useState(false);

    const [voiceText, setVoiceText] =
        useState("");

    const [showSidebar, setShowSidebar] =
        useState(false);

    /* Speech Recognition */
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const recognition =
        SpeechRecognition
            ? new SpeechRecognition()
            : null;

    /* Fetch Chats */
    const fetchChats = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:5000/api/chats"
                );

            const formattedChats = [];

            response.data
                .reverse()
                .forEach((chat) => {

                    formattedChats.push({
                        sender: "user",
                        text: chat.message
                    });

                    formattedChats.push({
                        sender: "ai",
                        text: chat.reply
                    });

                });

            setMessages(
                formattedChats
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchChats();

    }, []);

    /* Auto Scroll */
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    /* AI Voice */
    const speakText = (text) => {

        const speech =
            new SpeechSynthesisUtterance(
                text
            );

        speech.lang = "en-US";

        speech.rate = 1;

        window.speechSynthesis.speak(
            speech
        );

    };

    /* Stop AI Voice */
    const stopSpeaking = () => {

        window.speechSynthesis.cancel();

    };

    /* Send Voice */
    const sendVoiceMessage = async (
        voiceText
    ) => {

        if (!voiceText) return;

        const userMessage = {
            sender: "user",
            text: voiceText
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "http://localhost:5000/api/chat",
                    {
                        message:
                            voiceText,
                        mode,
                        user: JSON.parse(
                            localStorage.getItem(
                                "user"
                            )
                        )
                    }
                );

            const aiReply = {
                sender: "ai",
                text: response.data.reply
            };

            setMessages((prev) => [
                ...prev,
                aiReply
            ]);

            speakText(
                response.data.reply
            );

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    /* Start Listening */
    const startListening = () => {

        if (!recognition) {

            alert(
                "Speech Recognition not supported."
            );

            return;

        }

        setListening(true);

        recognition.continuous = true;

        recognition.interimResults = false;

        recognition.lang = "en-US";

        recognition.start();

        recognition.onresult = (
            event
        ) => {

            let finalTranscript = "";

            for (
                let i = 0;
                i < event.results.length;
                i++
            ) {

                if (
                    event.results[i]
                        .isFinal
                ) {

                    finalTranscript +=
                        event.results[i][0]
                            .transcript + " ";

                }

            }

            setVoiceText(
                finalTranscript
            );

        };

        recognition.onend = () => {

            if (listening) {

                recognition.start();

            }

        };

        recognition.onerror = (
            event
        ) => {

            console.log(
                event.error
            );

        };

    };

    /* Send Recorded Voice */
    const sendRecordedVoice =
        async () => {

            if (
                !voiceText.trim()
            ) return;

            recognition.stop();

            setListening(false);

            await sendVoiceMessage(
                voiceText
            );

            setVoiceText("");

        };

    /* Start Modes */
    const startMode = (
        selectedMode,
        intro
    ) => {

        setMode(
            selectedMode
        );

        setMessages([
            {
                sender: "ai",
                text: intro
            }
        ]);

        speakText(intro);

        setShowSidebar(false);

    };

    /* Clear Chats */
    const clearChats = async () => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to permanently delete all chats?"
            );

        if (!confirmDelete) return;

        try {

            setMessages([]);

            setVoiceText("");

            await axios.delete(
                "http://localhost:5000/api/chats"
            );

            alert(
                "All chats deleted permanently."
            );

        } catch (error) {

            console.log(error);

            alert(
                "Failed to delete chats."
            );

        }

    };

    return (

        <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">

            {/* Navbar */}
            <Navbar />

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Sidebar */}
                <div
                    className={`
                    fixed lg:relative z-50
                    top-0 left-0 h-full
                    w-72 bg-slate-800
                    border-r border-slate-700
                    p-4 md:p-6
                    overflow-y-auto
                    transform transition-transform duration-300
                    ${showSidebar
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                        }
                `}
                >

                    {/* Mobile Close */}
                    <div className="flex items-center justify-between mb-6 lg:hidden">

                        <h2 className="text-2xl font-bold">

                            Practice Modes

                        </h2>

                        <button
                            onClick={() =>
                                setShowSidebar(false)
                            }
                            className="text-3xl cursor-pointer"
                        >

                            ✕

                        </button>

                    </div>

                    {/* Desktop Title */}
                    <h2 className="hidden lg:block text-2xl font-bold mb-6">

                        Practice Modes

                    </h2>

                    <div className="grid grid-cols-1 gap-4">

                        <button
                            onClick={() =>
                                startMode(
                                    "normal",
                                    "💬 Casual Conversation Mode Started.\n\nLet's have a friendly conversation."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            💬 Casual Conversation

                        </button>

                        <button
                            onClick={() =>
                                startMode(
                                    "professional",
                                    "💼 Professional Speaking Mode Started.\n\nPractice workplace communication."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            💼 Professional Speaking

                        </button>

                        <button
                            onClick={() =>
                                startMode(
                                    "interview",
                                    "🎤 Mock Interview Started.\n\nTell me about yourself."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            🎤 Interview Practice

                        </button>

                        <button
                            onClick={() =>
                                startMode(
                                    "english",
                                    "📚 English Learning Mode Started."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            📚 English Learning

                        </button>

                        <button
                            onClick={() =>
                                startMode(
                                    "speaking",
                                    "🗣 Speaking Analysis Mode Started."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            🗣 Speaking Analysis

                        </button>

                        <button
                            onClick={() =>
                                startMode(
                                    "confidence",
                                    "🚀 Confidence Building Mode Started."
                                )
                            }
                            className="bg-slate-700 hover:bg-blue-600 p-4 rounded-xl text-left transition cursor-pointer"
                        >

                            🚀 Confidence Building

                        </button>

                    </div>

                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="border-b border-slate-700 p-4 md:p-6 bg-slate-800 flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            {/* Hamburger */}
                            <button
                                onClick={() =>
                                    setShowSidebar(true)
                                }
                                className="lg:hidden text-3xl cursor-pointer"
                            >

                                ☰

                            </button>

                            <div>

                                <h1 className="text-2xl md:text-3xl font-bold">

                                    AI Communication Coach

                                </h1>

                                <p className="text-slate-300 mt-1 text-sm md:text-base">

                                    Practice daily and improve your communication skills.

                                </p>

                            </div>

                        </div>

                        {/* Clear */}
                        <button
                            onClick={clearChats}
                            className="bg-red-600 hover:bg-red-700 px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold transition text-sm md:text-base cursor-pointer"
                        >

                            🗑 Clear

                        </button>

                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-slate-900">

                        {messages.map(
                            (
                                msg,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className={`flex ${msg.sender ===
                                            "user"
                                            ? "justify-end"
                                            : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`p-4 md:p-5 rounded-2xl max-w-full md:max-w-3xl shadow-lg whitespace-pre-line break-words ${msg.sender ===
                                                "user"
                                                ? "bg-blue-600"
                                                : "bg-slate-800"
                                            }`}
                                    >

                                        <p className="leading-7 text-sm md:text-base">

                                            {
                                                msg.text
                                            }

                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                        {/* Loading */}
                        {loading && (

                            <div className="flex justify-start">

                                <div className="bg-slate-800 p-4 rounded-2xl">

                                    <p className="animate-pulse">

                                        AI is typing...

                                    </p>

                                </div>

                            </div>

                        )}

                        <div
                            ref={
                                messagesEndRef
                            }
                        ></div>

                    </div>

                    {/* Voice Controls */}
                    <div className="p-4 border-t border-slate-700 bg-slate-800 flex-shrink-0">

                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">

                            {/* Mic */}
                            <button
                                onClick={
                                    startListening
                                }
                                className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full text-2xl md:text-3xl transition cursor-pointer ${listening
                                        ? "bg-red-600 animate-pulse scale-110"
                                        : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >

                                🎤

                            </button>

                            {/* Stop */}
                            <button
                                onClick={
                                    stopSpeaking
                                }
                                className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 text-2xl md:text-3xl transition cursor-pointer"
                            >

                                🔇

                            </button>

                            {/* Send */}
                            <button
                                onClick={
                                    sendRecordedVoice
                                }
                                className="px-5 md:px-6 py-3 md:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition text-sm md:text-base cursor-pointer"
                            >

                                Send

                            </button>

                        </div>

                        {/* Status */}
                        <div className="text-center mt-3 text-slate-300 text-xs md:text-sm">

                            {listening
                                ? "🎙 Listening..."
                                : "Tap mic and start speaking"}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Chat;