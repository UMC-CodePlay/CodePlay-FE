// src/pages/Main/HarmonyPage.jsx
import React, { useState, useContext, useEffect } from "react";
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
  const [harmonyStatus, setHarmonyStatus] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const taskId = localStorage.getItem("taskId");

  // harmonyStatus가 "COMPLETE"이면 버튼 활성화
  useEffect(() => {
    if (harmonyStatus === "COMPLETE") {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [harmonyStatus]);

  // taskId가 있으면 1초마다 harmony 상태를 업데이트
  useEffect(() => {
    if (!taskId) return;
    const interval = setInterval(() => {
      getHarmonyStatus(taskId);
    }, 1000);
    return () => clearInterval(interval);
  }, [taskId]);

  const getHarmonyStatus = async (taskId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/task/get-task`,
        { taskId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const status = response.data.result.processStatus;
      setHarmonyStatus(status);
      console.log("Harmony Status:", status);
    } catch (error) {
      console.error("API 요청 오류:", error.response?.data || error.message);
    }
  };

  return (
    <PageContainer>
      <ConditionalNavbar />
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
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PurpleButton disabled={!isButtonEnabled}>
          {isButtonEnabled ? (
            <Link
              to="/harmony/result_harmony"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              결과보기
            </Link>
          ) : (
            <span>결과보기</span>
          )}
        </PurpleButton>
      </div>
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
