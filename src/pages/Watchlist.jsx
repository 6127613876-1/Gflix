import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Watchlist = () => {
  const [user] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const watchlistRef = ref(db, `watchlist/${user.uid}`);
      onValue(watchlistRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setWatchlist(Object.values(data));
        } else {
          setWatchlist([]);
        }
      });
    }
  }, [user]);

  if (!user) return <p className="text-center mt-20">Login to see your watchlist</p>;

  return (
    <section className="py-12 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-pink-500 mb-6">My Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {watchlist.map((movie, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
              <img src={movie.img} alt={movie.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold dark:text-white">{movie.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{movie.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Watchlist;
