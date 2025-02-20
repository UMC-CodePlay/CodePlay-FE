// src/pages/Main/HarmonyPage.jsx
import React, { useState, useContext, useEffect } from "react";
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import PurpleButton from "../../components/Buttons/PurpleButton";
import UploadHarmony from "../../components/UploadHarmony";
import styled from "styled-components";
import BackgroundSvg from "../../assets/HarmonyBg.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const HarmonyPage = () => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 여부
  const [isUploading, setIsUploading] = useState(false); // 업로드 중인지 여부
  const navigate = useNavigate();

  // 업로드 완료 후 taskId를 조회하여 상태 체크
  useEffect(() => {
    if (!isUploading) return; // 업로드 중이 아니면 실행 X

    const token = localStorage.getItem("token");
    const taskId = localStorage.getItem("taskId");
    if (!taskId) return; // taskId가 없으면 실행 X

    console.log("상태 조회 시작");

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
          },
        );

        const status = response.data.result.processStatus;
        console.log("화성 분석 작업 상태:", status);

        if (status === "COMPLETED") {
          console.log("작업 끝 결과보기 버튼 활성화");
          setIsButtonEnabled(true);
        } else {
          console.warn("작업중, 3초 후 조회");
          setTimeout(pollTask, 3000); // 3초 후 다시 조회
        }
      } catch (error) {
        console.error("작업상태오류:", error.response?.data || error.message);
      }
    };

    pollTask();
  }, [isUploading]); // 업로드 완료 후 상태 조회

  // 버튼 클릭 시 결과 페이지로 이동
  const handleResultClick = () => {
    if (isButtonEnabled) {
      navigate("/harmony/result_harmony");
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
      <UploadHarmony setIsUploading={setIsUploading} />{" "}
      <ButtonContainer>
        <PurpleButton disabled={!isButtonEnabled} onClick={handleResultClick}>
          결과보기
        </PurpleButton>
      </ButtonContainer>
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

const ButtonContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
