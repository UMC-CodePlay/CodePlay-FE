// src/pages/Main/SessionPage.jsx
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/BlueButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/sessionBack.svg";
import styled from "styled-components";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import { AuthContext } from "../../context/AuthContext";

const SessionPage = () => {
  const { token } = useContext(AuthContext);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [sessionStatus, setSessionStatus] = useState(null);
  const [count, setCount] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  useEffect(() => {
    if (sessionStatus === "COMPLETE") {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [sessionStatus]);
  const taskId = localStorage.getItem("taskId");
  useEffect(() => {
    const interval = setInterval(() => {
      getSessionStatus(taskId);
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [taskId]); // ✅ taskId가 변경될 때마다 useEffect 실행

  const getSessionStatus = async (taskId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/task/get-task`,
        { taskId }, // ✅ taskId를 바디에 포함
        {
          headers: {
            "Content-Type": "application/json", // ✅ 올바른 Content-Type 사용
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const status = response.data.result.processStatus;
      setSessionStatus(status); // ✅ 상태 업데이트

      console.log("🔄 Session Status:", status);
    } catch (error) {
      console.error("❌ API 요청 오류:", error.response?.data || error.message);
    }
  };

  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경 */}
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
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <SessionButton disabled={sessionStatus !== "COMPLETE"}>
          <Link to="/session/result_session">결과보기</Link>
        </SessionButton>
      </div>
      {/* <Othersystems /> */}
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
