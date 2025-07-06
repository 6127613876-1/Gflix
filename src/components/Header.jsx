import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { LogIn, LogOut } from "lucide-react";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-zinc-900 shadow-md transition duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-pink-500 flex items-center gap-2">
          <i className="bx bxs-movie text-2xl"></i> GFlix
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <Link
              to="/"
              className="text-zinc-700 dark:text-white font-medium hover:text-pink-500 transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#movies"
              className="text-zinc-700 dark:text-white font-medium hover:text-pink-500 transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Movies
            </a>
          </li>
          <li>
            <a
              href="#coming"
              className="text-zinc-700 dark:text-white font-medium hover:text-pink-500 transition relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-pink-500 hover:after:w-full after:transition-all after:duration-300"
            >
              Coming
            </a>
          </li>
        </ul>

        {/* Auth & Profile */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-pink-500 hover:scale-105 transition"
              />
            </Link>
            <span className="text-sm text-zinc-700 dark:text-white hidden md:block">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <LogIn size={16} /> Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
