import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Your custom auth context
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

const Profile = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const watchlistRef = ref(db, `watchlist/${user.uid}`);
    const unsubscribe = onValue(watchlistRef, (snapshot) => {
      const data = snapshot.val();
      const list = data ? Object.values(data) : [];
      setWatchlist(list);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <img
          src={user.photoURL || "https://i.pravatar.cc/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold mt-2">{user.displayName || "User"}</h2>
        <p className="text-zinc-500">{user.email}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-pink-500">Your Watchlist</h3>
        {watchlist.length === 0 ? (
          <p className="text-zinc-500">Your watchlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {watchlist.map((movie, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-semibold text-lg text-zinc-800 dark:text-white">
                    {movie.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{movie.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
