import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-pink-400 py-12 px-6 md:px-16">
      {/* Top Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-white">Sakthi Cinema's</h1>
        <p className="text-sm text-zinc-300 max-w-lg">
          "Movies are the memories of our lifetime. We need to keep them alive"
        </p>
      </div>

      {/* Grid Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">All</a></li>
            <li><a href="/" className="hover:text-white">Horror</a></li>
            <li><a href="/" className="hover:text-white">Action</a></li>
            <li><a href="/" className="hover:text-white">Adventure</a></li>
            <li><a href="/" className="hover:text-white">Comedy</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Resources</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">User Guides</a></li>
            <li><a href="/" className="hover:text-white">Help</a></li>
            <li><a href="/" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Company</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">About Us</a></li>
            <li><a href="/" className="hover:text-white">Support</a></li>
            <li><a href="/" className="hover:text-white">Join Us</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-zinc-500 border-t border-zinc-700 pt-4">
        © Sakthi Cinema's. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
