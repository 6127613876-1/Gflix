import React from "react";
import img1 from "./img/VJA.png";
import img2 from "./img/yuvan.png";
import img3 from "./img/arr.jpg";

const events = [
  {
    img: img1,
    title: "Vijay Antony Live",
    date: "Monday, June 06 | 6:00 PM",
    location: "Chennai",
  },
  {
    img: img2,
    title: "YUVAN Live",
    date: "Monday, March 14 | 4:00 PM",
    location: "Singapore",
  },
  {
    img: img3,
    title: "AR RAHMAN LIVE",
    date: "Monday, July 24 | 8:00 PM",
    location: "Dubai",
  },
];

const Events = () => {
  return (
    <section className="py-12 bg-white dark:bg-zinc-900">
      <h1 className="text-3xl font-bold text-pink-500 mb-10 ml-8">
        Upcoming Events
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 px-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden w-full lg:w-[450px] transition-transform hover:scale-105"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-[258px] object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {event.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {event.date}
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
