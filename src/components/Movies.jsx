import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ref as dbRef, onValue, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import "swiper/css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [user] = useAuthState(auth);
  const [watchlist, setWatchlist] = useState({});

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

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {movies.map((movie, index) => {
            const isAdded = watchlist?.[movie.title] !== undefined;
            const [duration, ...genres] = movie.desc?.split("|") || [];

            return (
              <SwiperSlide key={index} className="h-full">
                <div className="flex flex-col h-full cursor-pointer bg-white dark:bg-zinc-800 rounded-xl shadow-md transition-transform duration-300">
                  <img
                    src={movie.img || "/fallback.jpg"}
                    alt={movie.title}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-2 min-h-[48px] text-center">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-center text-zinc-600 dark:text-zinc-400  min-h-[40px] whitespace-pre-line">
                      {duration?.trim()} 
                      <br />
                      {genres.join(" | ").trim()}
                    </p>
                    <button
                      onClick={() => handleAddToWatchlist(movie)}
                      disabled={isAdded}
                      className={`mt-3 px-4 cursor-pointer py-1 rounded transition text-white ${
                        isAdded
                          ? "bg-green-500 cursor-not-allowed"
                          : "bg-pink-500 hover:bg-pink-600"
                      }`}
                    >
                      {isAdded ? "✓ Added" : "+ Watchlist"}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Movies;
