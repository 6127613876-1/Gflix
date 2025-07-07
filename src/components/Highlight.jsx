import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const trailers = [
  {
    title: "Joker Teaser",
    url: "https://www.youtube.com/embed/t433PEQGErc?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=t433PEQGErc",
  },
  {
    title: "The Batman",
    url: "https://www.youtube.com/embed/mqqft2x_Aa4?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=mqqft2x_Aa4",
  },
  {
    title: "Deadpool & Wolverine",
    url: "https://www.youtube.com/embed/73_1biulkYk?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=73_1biulkYk",
  },
  {
    title: "Oppenheimer",
    url: "https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=uYPbbksJxIg",
  },
];

const Highlight = () => {
  const [index, setIndex] = useState(0);

  const prevVideo = () => {
    setIndex((prev) => (prev === 0 ? trailers.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setIndex((prev) => (prev === trailers.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">
          Trailers of This Week
        </h1>
        <div className="relative max-w-7xl mx-auto aspect-video rounded-xl shadow-lg">
          <iframe
            src={trailers[index].url}
            title={trailers[index].title}
            width="100%"
            height="100%"
            allow=" encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>

          {/* Navigation Buttons */}
          <button
            onClick={prevVideo}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-600 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextVideo}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow hover:bg-pink-600 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
