// src/pages/Main/HomePage.jsx
import styled from "styled-components";
import { useState } from "react";
// 기존: import Navbar from "../../components/Navbar.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar.jsx";

import Header from "../../components/1screen/header.jsx";
import Harmony from "../../components/2screen/harmony.jsx";
import Remix from "../../components/2screen/remix.jsx";
import Stem from "../../components/4screen/stem.jsx";
import bg2 from "../../assets/bg2.svg";
import bg3 from "../../assets/bg3.svg";
import bg4 from "../../assets/bg4.svg";
import bg5 from "../../assets/bg5.svg";
import BackgroundHeader from "../../assets/Landing_img/bg.png";
import AdIcons from "../../components/6screen/AdIcons.jsx";
import NowPlaying from "../../components/6screen/nowPlaying.jsx";

const HomePageWrapper = styled.div`
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
  background-color: black;
  overflow-y: auto;
  text-align: center;
`;

const HeaderContainer = styled.div`
  width: 100vw;
  min-height: 980px;
  background-image: url(${BackgroundHeader});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HarmonyContainer = styled.div`
  width: 100vw;
  height: 980px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StemContainer = styled.div`
  width: 100vw;
  height: 980px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 600px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
`;

const SectionImage = styled.img`
  width: 100%;
  height: 900px;
  display: block;
  object-fit: cover;
`;

const HomePage = () => {
  return (
    <HomePageWrapper>
      {/* ▼ ConditionalNavbar로 교체 */}
      <ConditionalNavbar />

      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <BackgroundImage src={bg2} alt="Background" />
      {/* <BackgroundImage src={bg3} alt="Background" /> */}
      <NowPlaying />
      <HarmonyContainer>
        <Harmony />
      </HarmonyContainer>
      <StemContainer>
        <Stem />
      </StemContainer>
      <HarmonyContainer>
        <Remix />
      </HarmonyContainer>
      <SectionImage src={bg5} alt="Screen5" />
      <AdIcons />
    </HomePageWrapper>
  );
};

export default HomePage;
