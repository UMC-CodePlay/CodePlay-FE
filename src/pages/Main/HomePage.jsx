// src/pages/Main/HomePage.jsx
import styled from "styled-components";
import { useState } from "react";
// 기존: import Navbar from "../../components/Navbar.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

import Header from "../../components/1screen/header.jsx";
import Harmony from "../../components/2screen/harmony.jsx";
import Stem from "../../components/4screen/stem.jsx";
import bg2 from "../../assets/bg2.svg";
import bg3 from "../../assets/bg3.svg";
import Screen5 from "../../assets/Screen5.svg";
import BackgroundHeader from "../../assets/Landing_img/1bg.svg";
import AdIcons from "../../components/6screen/AdIcons.jsx";

const HomePageWrapper = styled.div`
  font-family: "Arial", sans-serif;
  box-sizing: border-box;
  background-color: #f9f9f9;
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
      <BackgroundImage src={bg3} alt="Background" />
      <HarmonyContainer>
        <Harmony />
      </HarmonyContainer>
      <StemContainer>
        <Stem />
      </StemContainer>
      <SectionImage src={Screen5} alt="Screen5" />
      <AdIcons />
    </HomePageWrapper>
  );
};

export default HomePage;
