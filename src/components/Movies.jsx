import React, { useEffect, useState, useRef } from "react";
import { ref as dbRef, onValue, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { toast } from "react-hot-toast";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [user] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState({});
  const intervalRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    renderMode: "performance",
    slides: {
      perView: 5,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
    },
  });

  // Auto slide every 5s
  useEffect(() => {
    if (instanceRef.current) {
      intervalRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [instanceRef]);

  // Fetch movies from Firebase
  useEffect(() => {
    const movieRef = dbRef(db, "movies/");
    const unsubscribe = onValue(movieRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMovies(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's watchlist
  useEffect(() => {
    if (user) {
      const watchlistRef = dbRef(db, `watchlist/${user.uid}`);
      const unsubscribe = onValue(watchlistRef, (snapshot) => {
        const data = snapshot.val() || {};
        setWatchlist(data);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddToWatchlist = (movie) => {
    if (!user) {
      toast.error("Login to add to watchlist");
      return;
    }

    const movieRef = dbRef(db, `watchlist/${user.uid}/${movie.title}`);
    set(movieRef, movie)
      .then(() => toast.success("Added to watchlist!"))
      .catch(() => toast.error("Failed to add to watchlist"));
  };

  return (
    <section id="movies" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-pink-500 mb-8">Recommended Movies</h2>

        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {movies.map((movie, index) => {
            const isAdded = watchlist?.[movie.title] !== undefined;

            return (
              <div
                key={index}
                className="keen-slider__slide bg-white dark:bg-zinc-800 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <img
                  src={movie.img || "/fallback.jpg"}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-t-xl cursor-pointer"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-800 dark:text-white line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mt-1">
                    {movie.desc}
                  </p>
                  <button
                    onClick={() => handleAddToWatchlist(movie)}
                    disabled={isAdded}
                    className={`mt-3 px-4 py-1 rounded transition text-white ${
                      isAdded
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-pink-500 hover:bg-pink-600"
                    }`}
                  >
                    {isAdded ? "✓ Added" : "+ Watchlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Movies;
