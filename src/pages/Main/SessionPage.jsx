// src/pages/Main/SessionPage.jsx
import React, { useState, useContext, useEffect } from "react";
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/BlueButton"; // BlueButton 사용
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/sessionBack.svg";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SessionPage = () => {
  const { token } = useContext(AuthContext);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const taskId = localStorage.getItem("taskId");
  const navigate = useNavigate();

  useEffect(() => {
    // sessionStatus가 "COMPLETE"이면 버튼 활성화
    setIsButtonEnabled(sessionStatus === "COMPLETE");
  }, [sessionStatus]);

  useEffect(() => {
    if (!taskId) return; // taskId가 없으면 실행하지 않음
    const interval = setInterval(() => {
      getSessionStatus(taskId);
    }, 1000);
    return () => clearInterval(interval);
  }, [taskId]);

  const getSessionStatus = async (taskId) => {
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
      setSessionStatus(status);
      console.log("🔄 Session Status:", status);
    } catch (error) {
      console.error("❌ API 요청 오류:", error.response?.data || error.message);
    }
  };

  const handleResultClick = () => {
    if (isButtonEnabled) {
      navigate("/session/result_session");
    }
  };

  return (
    <PageContainer>
      <ConditionalNavbar />
      <TitleNavbar
        title="세션 분리"
        subtitle="딥러닝 모델이 원곡의 트랙을 분리합니다."
      />
      <BackgroundImage src={BackgroundSvg} alt="Background" />
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadSession sessionStatus={sessionStatus} />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SessionButton disabled={!isButtonEnabled} onClick={handleResultClick}>
          결과보기
        </SessionButton>
      </div>
    </PageContainer>
  );
};

export default SessionPage;

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
