// src/pages/Main/HarmonyPage.jsx
import React, { useState, useContext, useEffect } from "react";
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
  const [timestamp, setTimestamp] = useState(Date.now());
  const [harmonyStatus, setHarmonyStatus] = useState(null);
  const [count, setCount] = useState(0);
  const taskId = localStorage.getItem("taskId");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  useEffect(() => {
    if (harmonyStatus === "COMPLETE") {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [harmonyStatus]);
  useEffect(() => {
    if (!taskId) return; // taskId가 없으면 실행하지 않음

    const interval = setInterval(() => {
      getHarmonyStatus(taskId);
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [taskId]); // ✅ taskId가 변경될 때마다 useEffect 실행

  const getHarmonyStatus = async (taskId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/task/get-task`,
        { taskId }, // ✅ taskId를 디에 포함
        {
          headers: {
            "Content-Type": "application/json", // ✅ 올바른 Content-Type 사용
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const status = response.data.result.processStatus;
      setHarmonyStatus(status); // ✅ 상태 업데이트

      console.log("🔄 Harmony Status:", status);
    } catch (error) {
      console.error("❌ API 요청 오류:", error.response?.data || error.message);
    }
  };

  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경됨 */}
      <TitleNavbar
        title="화성 분석"
        subtitle="비트 추적, 키 감지, 하모닉 분석으로 인사이트를 제공합니다."
      />
      <BackgroundImage src={BackgroundSvg} alt="Background" />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadHarmony />
      </div>
      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <PurpleButton disabled={!isButtonEnabled}>
          <Link to="/harmony/result_harmony">결과보기</Link>
        </PurpleButton>
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
