import React from "react";
import Header from "../components/Header";
import Home from "../components/Home";
import Movies from "../components/Movies";
import ComingSoon from "../components/ComingSoon";
import Highlight from "../components/Highlight";
import Events from "../components/Events";
import Footer from "../components/Footer";
// import Profile from "../components/Profile"; // Optional

const Movie = () => {
  return (
    <>
      <Header />
      <main > 
        <Home />
        <Movies />
        <ComingSoon />
        <Highlight />
        <Events />
        {/* <Profile /> */}
      </main>
      <Footer />
    </>
  );
};

export default Movie;
