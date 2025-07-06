// src/components/Dashboard.jsx
import React from 'react';
import Profile from './Profile';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Welcome to GFlix 🎬</h1>
      <Profile />
      <button
        onClick={() => signOut(auth)}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
