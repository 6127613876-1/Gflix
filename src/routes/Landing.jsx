// pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
      <h1 className="text-5xl font-bold text-pink-500 mb-6">Welcome to GFlix</h1>
      <p className="mb-8">Sign in to continue watching your favorite content</p>
      <Link
        to="/login"
        className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-md font-semibold"
      >
        Login
      </Link>
    </div>
  );
};

export default Landing;
