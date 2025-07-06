import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import "keen-slider/keen-slider.min.css";

const ComingSoon = () => {
  const [comingSoon, setComingSoon] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 5,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 4, spacing: 16 } },
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
    },
    created: (instance) => {
      setInterval(() => {
        instance.next();
      }, 5000); // 5 seconds
    },
  });

  useEffect(() => {
    const comingRef = ref(db, "comingSoon/");
    const unsubscribe = onValue(comingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setComingSoon(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="coming" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-pink-500 mb-8">
          Upcoming Movies
        </h2>

        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {comingSoon.map((movie, index) => (
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
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2">
                  {movie.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line mt-1">
                  {movie.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
