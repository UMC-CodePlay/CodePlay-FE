import styled from "styled-components";
import { useState } from "react";
import Navbar from "../../components/Navbar.jsx";
import Header from "../../components/1screen/header.jsx";
import Harmony from "../../components/2screen/harmony.jsx";
import Stem from "../../components/4screen/stem.jsx";
import a from "../../assets/a.svg";
import Screen5 from "../../assets/Screen5.svg";
import Screen6 from "../../assets/Screen6.svg";
import Navbarlog from "../../components/Mypg/NavbarLog.jsx";
import { useNavbar } from "../../context/NavbarContext";
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

// HomePage 컴포넌트 정의
const HomePage = () => {

  const { isNavbar1 } = useNavbar();
  return (
    <HomePageWrapper>
      {isNavbar1 ? <Navbarlog /> : <Navbar />}
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <BackgroundImage src={a} alt="Background" />
      <HarmonyContainer>
        <Harmony />
      </HarmonyContainer>
      <StemContainer>
      <Stem />
      </StemContainer>
      <SectionImage src={Screen5} alt="Screen5" />
      <AdIcons></AdIcons>
    </HomePageWrapper>
  );
};

export default HomePage;
