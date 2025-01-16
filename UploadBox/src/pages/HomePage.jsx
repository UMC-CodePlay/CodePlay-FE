import Navbar from "../components/Navbar";
import React from "react";
import Header from "../components/1screen/header.jsx";
import Pearch from "../components/1screen/search.jsx";
import Feature from "../components/1screen/feature.jsx";
import Harmony from "../components/2screen/harmony.jsx";
import Score from "../components/3screen/score.jsx";
import Stem from "../components/4screen/stem.jsx";
import Othersystems from "../components/Othersystems";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div className="container">
        <Header />
        <Pearch />
        <Feature />

        <Harmony />

        <Score />

        <Stem />
      </div>
    </div>
  );
};

export default HomePage;
