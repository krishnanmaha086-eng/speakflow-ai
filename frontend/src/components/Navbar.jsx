import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

function Navbar() {

    const [theme, setTheme] =
        useState(
            localStorage.getItem("theme") || "dark"
        );

    const [menuOpen, setMenuOpen] =
        useState(false);

    const navigate =
        useNavigate();

    const user =
        localStorage.getItem("user");

    /* Toggle Theme */
    const toggleTheme = () => {

        setTheme(
            theme === "dark"
                ? "light"
                : "dark"
        );

    };

    /* Logout */
    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };

    /* Theme */
    useEffect(() => {

        const root =
            document.getElementById("root");

        root.className =
            theme === "dark"
                ? "dark-theme"
                : "light-theme";

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);

    /* Background */
    useEffect(() => {

        const root =
            document.documentElement;

        if (theme === "light") {

            root.style.setProperty(
                "--main-bg",
                "#f8fafc"
            );

        } else {

            root.style.setProperty(
                "--main-bg",
                "#0f172a"
            );

        }

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);

    return (

        <nav className="border-b border-slate-700 bg-slate-900 text-white">

            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">

                {/* Logo */}
                <Link to="/">

                    <h1 className="text-2xl md:text-3xl font-bold text-blue-500">

                        SpeakFlow AI

                    </h1>

                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-blue-400 transition cursor-pointer"
                    >
                        Home
                    </Link>

                    {user ? (

                        <>

                            <Link
                                to="/dashboard"
                                className="hover:text-blue-400 transition cursor-pointer"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/chat"
                                className="hover:text-blue-400 transition cursor-pointer"
                            >
                                Chat
                            </Link>

                            {/* Theme */}
                            <button
                                onClick={toggleTheme}
                                className={`px-4 py-2 rounded-lg transition ${
                                    theme === "dark"
                                        ? "bg-slate-700"
                                        : "bg-yellow-400 text-black"
                                }`}
                            >

                                {theme === "dark"
                                    ? "🌙 Dark"
                                    : "☀️ Light"}

                            </button>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition cursor-pointer"
                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="hover:text-blue-400 transition cursor-pointer"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition cursor-pointer"
                            >

                                Register

                            </Link>

                        </>

                    )}

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    className="md:hidden text-3xl"
                >

                    ☰

                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (

                <div className="md:hidden flex flex-col gap-4 px-4 pb-5 bg-slate-800">

                    <Link
                        to="/"
                        className="hover:text-blue-400 transition cursor-pointer"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </Link>

                    {user ? (

                        <>

                            <Link
                                to="/dashboard"
                                className="hover:text-blue-400 transition cursor-pointer"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/chat"
                                className="hover:text-blue-400 transition cursor-pointer"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Chat
                            </Link>

                            {/* Theme */}
                            <button
                                onClick={toggleTheme}
                                className={`px-4 py-2 rounded-lg transition text-left ${
                                    theme === "dark"
                                        ? "bg-slate-700"
                                        : "bg-yellow-400 text-black"
                                }`}
                            >

                                {theme === "dark"
                                    ? "🌙 Dark"
                                    : "☀️ Light"}

                            </button>

                            {/* Logout */}
                            <button
                                onClick={() => {

                                    handleLogout();

                                    setMenuOpen(false);

                                }}
                                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition text-left"
                            >

                                Logout

                            </button>

                        </>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="hover:text-blue-400 transition cursor-pointer"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition text-center"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >

                                Register

                            </Link>

                        </>

                    )}

                </div>

            )}

        </nav>

    );

}

export default Navbar;