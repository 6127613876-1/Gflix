import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "swiper/css";



const ComingSoon = () => {
  const [comingSoon, setComingSoon] = useState([]);

  useEffect(() => {
  const comingRef = ref(db, "comingSoon/");
  const unsubscribe = onValue(comingRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const moviesArray = Object.values(data);
      console.table(moviesArray);
      setComingSoon(moviesArray);
    }
  });
  return () => unsubscribe();
}, []);


  console.log(comingSoon)

  return (
    <section id="coming" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-pink-500 mb-8">
          Upcoming Movies
        </h2>

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
          {comingSoon.map((movie, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="flex flex-col h-full bg-white cursor-pointer dark:bg-zinc-800 rounded-xl shadow-md transition-transform duration-300">
                <img
                  src={movie.img || "/fallback.jpg"}
                  alt={movie.title}
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                  className="w-full h-64   object-cover rounded-t-xl"
                />
                <div className="p-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-white line-clamp-2 min-h-[48px] text-center">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-center text-zinc-600 dark:text-zinc-400  whitespace-pre-line">
                    {movie.desc.split("|")[0].trim()} min <br />
                    {movie.desc.split("|").slice(1).join(" | ").trim()}
                  </p>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ComingSoon;
