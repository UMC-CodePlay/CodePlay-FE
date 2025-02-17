// src/pages/Main/Result_HarmonyPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConditionalNavbar from "../../components/ConditionalNavbar"; // 추가
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import Slick from "../../components/Slick";
import PurpleButton from "../../components/Buttons/PurpleButton";
import PrevPurpleButton from "../../components/Buttons/PrevPurpleButton";
import BackGroundResult from "../../components/BackGroundResult";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Result_HarmonyPage = () => {
  const [fileInfo, setFileInfo] = useState({
    fileName: "",
    fileSize: "",
    musicId: "",
    taskId: "",
  });

  useEffect(() => {
    const storedFile = localStorage.getItem("uploadedFile");
    if (storedFile) {
      const parsedFile = JSON.parse(storedFile);
      setFileInfo(parsedFile);
      // parsedFile.taskId ? getRequeestHarmony(parsedFile) : null;
    }
  }, []);

  return (
    <>
      <ConditionalNavbar /> {/* 변경 */}
      <TitleNavbar
        title="화성 분석 결과"
        subtitle="음원 분석 결과를 확인하세요"
      />
      <BackGroundResult />

      <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
        <UploadBox
          fileName={fileInfo.fileName || "파일이 없습니다"}
          fileDetails={`크기: ${fileInfo.fileSize} / musicId: ${fileInfo.musicId} / taskId: ${fileInfo.taskId}`}
        />
      </div>

      <Slick />

      <div style={{ marginTop: "60px", display: "flex", justifyContent: "center", gap: "70px" }}>
        <PrevPurpleButton>
          <Link to="/harmony">이전으로</Link>
        </PrevPurpleButton>

        <StyledPurpleButton>
          <Link to="/audioloading">다운로드</Link>
        </StyledPurpleButton>
      </div>

      <Othersystems />
    </>
  );
};

export default Result_HarmonyPage;

const StyledPurpleButton = styled(PurpleButton)`
  width: 160px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
`;
