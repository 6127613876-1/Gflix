// src/components/Login.jsx
import React from 'react';
import { auth, provider, signInWithPopup } from '../firebase';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">Sign In</h2>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
