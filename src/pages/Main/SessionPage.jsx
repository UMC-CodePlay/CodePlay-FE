import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/sessionBack.svg";
import SessionButton from "../../components/Buttons/BlueButton";
import { AuthContext } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SessionPage = () => {
  const { token } = useContext(AuthContext);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 여부
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUploading) return; // ✅ 업로드 중이 아니면 실행 X

    const token = localStorage.getItem("token");
    const taskId = localStorage.getItem("taskId");
    if (!taskId) return; // ✅ taskId가 없으면 실행 X

    console.log("업로드 끝 상태 조회 시작");

    const pollTask = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/task/get-task`,
          { taskId: taskId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const status = response.data.result.processStatus;
        console.log("세션 작업 상태:", status);

        if (status === "COMPLETED") {
          console.log("작업 끝 결과보기 버튼 활성화");
          setIsButtonEnabled(true);
        } else {
          console.warn("작업 중, 3초 후 재시도...");
          setTimeout(pollTask, 3000); // ✅ 3초 후 다시 조회
        }
      } catch (error) {
        console.error("작업 상태 조회 오류:", error.response?.data || error.message);
      }
    };

    pollTask();
  }, [isUploading]); // ✅ 업로드 완료 후 상태 조회

  // ✅ "결과보기" 버튼 클릭 시 결과 페이지로 이동
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
      <UploadSession setIsUploading={setIsUploading} /> {/* ✅ 업로드 상태 전달 */}
      <ButtonContainer>
        <SessionButton disabled={!isButtonEnabled} onClick={handleResultClick}>
          결과보기
        </SessionButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default SessionPage;

// ✅ 스타일
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

const ButtonContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

