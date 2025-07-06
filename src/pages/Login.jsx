// src/pages/Login.jsx
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate("/movie");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/movie");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">
          Login to GFlix
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 cursor-pointer transition py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2 text-zinc-400">OR</p>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 cursor-pointer bg-white text-black font-medium py-2 px-4 rounded-md w-full hover:bg-zinc-100 transition"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
