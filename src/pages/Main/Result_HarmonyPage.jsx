import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
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

  // 🔹 페이지 로드 시 localStorage 데이터 가져오기
  useEffect(() => {
    const storedFile = localStorage.getItem("uploadedFile");
    if (storedFile) {
      const parsedFile = JSON.parse(storedFile);
      setFileInfo(parsedFile);
      parsedFile.taskId ? getRequeestHarmony(parsedFile) : null;
    }
  }, []);

  const getRequeestHarmony = async (taskId) => {
    const token = localStorage.getItem("token");
    const formData = new setFileInfo();
    formData.append("taskId", taskId);
    1;
    const reponse = await axios.post(`${API_BASE_URL}/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <>
      <Navbar />
      <TitleNavbar
        title="화성 분석 결과"
        subtitle="음원 분석 결과를 확인하세요"
      />
      <BackGroundResult />

      {/* 🔹 업로드된 파일 정보 표시 */}
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadBox
          fileName={fileInfo.fileName || "파일이 없습니다"}
          fileDetails={`크기: ${fileInfo.fileSize} / musicId: ${fileInfo.musicId} / taskId: ${fileInfo.taskId}`}
        />
      </div>

      <Slick />

      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          gap: "70px",
        }}
      >
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
