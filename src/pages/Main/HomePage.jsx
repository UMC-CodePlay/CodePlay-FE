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
import { useNavbar } from "../../context/NavbarContext"; // Context 사용


// styled-components로 스타일 정의
const HomePageWrapper = styled.div`
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  overflow-y: auto;
  padding-top: 200px;
  text-align: center;
`;

const BackgroundImage = styled.img`
  width: 1920px;
  height: 600px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
`;
const SectionImage = styled.img`
  width: 1920px;
  height: 900px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
`;

// HomePage 컴포넌트 정의
const HomePage = () => {

  const { isNavbar1 } = useNavbar();
  return (
    <HomePageWrapper>
      {isNavbar1 ? <Navbarlog /> : <Navbar />}
      <Header />
      <BackgroundImage src={a} alt="Background" />
      <Harmony />
      <Stem />
      <SectionImage src={Screen5} alt="Screen5" />
      <SectionImage src={Screen6} alt="Screen6" />
    </HomePageWrapper>
  );
};

export default HomePage;
