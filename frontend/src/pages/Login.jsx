import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://speakflow-ai-production.up.railway.app/api/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-900 text-white">

      <Navbar />

      <div className="flex items-center justify-center px-4 py-10 md:py-20">

        <div className="bg-slate-800 w-full max-w-md p-6 md:p-10 rounded-2xl shadow-lg">

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Welcome Back
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 md:gap-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="p-3 md:p-4 rounded-xl bg-slate-700 outline-none text-sm md:text-base"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="p-3 md:p-4 rounded-xl bg-slate-700 outline-none text-sm md:text-base"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 p-3 md:p-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Login
            </button>

          </form>

          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-500 cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>

          <div className="flex justify-center mt-6">

            <GoogleLogin
              onSuccess={async (credentialResponse) => {

                try {

                  const response =
                    await axios.post(
                      "https://speakflow-ai-production.up.railway.app/api/google-auth",
                      {
                        credential:
                          credentialResponse.credential,
                      }
                    );

                  localStorage.setItem(
                    "user",
                    JSON.stringify(
                      response.data.user
                    )
                  );

                  navigate("/dashboard");

                } catch (error) {

                  console.log(error);

                  alert(
                    "Google Login Failed"
                  );

                }

              }}
              onError={() => {

                alert(
                  "Google Login Failed"
                );

              }}
            />

          </div>

          <p className="text-center text-slate-400 mt-6 text-sm md:text-base">
            Improve your communication skills with AI 🚀
          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;