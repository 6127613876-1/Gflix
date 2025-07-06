import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img1 from "./img/home1.png";
import img2 from "./img/home2.jpg";
import img3 from "./img/home3.jpg";
import img4 from "./img/home4.png";

const slides = [
  {
    img: img1,
    tag: "Thala Ajith In",
    title: "Mankatha",
  },
  {
    img: img2,
    tag: "Marvel Universe",
    title: "Iron Man",
  },
  {
    img: img3,
    tag: "Marvel Universe",
    title: "Spider-Man\nNo Way Home",
  },
  {
    img: img4,
    tag: "Marvel Universe",
    title: "Avengers:\nEnd Game",
  },
];

const Home = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slideChanged() {},
    duration: 800,
  });

  return (
    <section id="home" className="relative w-full h-[80vh] overflow-hidden mt-0">
  <div ref={sliderRef} className="keen-slider">
    {Array.isArray(slides) &&
      slides.map((slide, index) => (
        <div
          key={index}
          className="keen-slider__slide relative w-full h-[80vh] flex items-center justify-center"
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="absolute w-full h-full object-cover z-0"
          />
        </div>
      ))}
  </div>
</section>
  );
};

export default Home;
