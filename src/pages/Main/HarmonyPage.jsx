// src/pages/Main/HarmonyPage.jsx
import React, { useState, useContext } from "react";
// import Navbar from "../../components/Navbar";  // 삭제
import ConditionalNavbar from "../../components/ConditionalNavbar";

import TitleNavbar from "../../components/TitleNavbar";
import PurpleButton from "../../components/Buttons/PurpleButton";
import UploadHarmony from "../../components/UploadHarmony";
import styled from "styled-components";
import BackgroundSvg from "../../assets/HarmonyBg.svg";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const HarmonyPage = () => {
  const { token } = useContext(AuthContext);


  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경됨 */}
      <TitleNavbar title="화성 분석" subtitle="비트 추적, 키 감지, 하모닉 분석으로 인사이트를 제공합니다." />
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadHarmony/>
      </div>

      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <PurpleButton><Link to='/harmony/result_harmony'>결과보기</Link></PurpleButton>
      </div>

      {/* <Othersystems /> */}
    </PageContainer>
  );
};

export default HarmonyPage;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;
const BackgroundImage = styled.img`
  width: 100vw;
  min-height: 747px;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 350px;
  left: 0;
  z-index: -1;
  background-color: black;
`;
