// src/pages/Main/Result_HarmonyPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ConditionalNavbar from "../../components/ConditionalNavbar"; // 추가
import TitleNavbar from "../../components/TitleNavbar";
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
  });
  const [harmonyInfo, setHarmonyInfo] = useState({
    musicTitle: "",
    harmonyscale: "",
    harmonygenre: "",
    harmonybpm: "",
    harmonyvoiceColor: "",
  });

  useEffect(() => {
    const storedFile = localStorage.getItem("uploadedFile");
    if (storedFile) {
      setFileInfo(JSON.parse(storedFile));
    }
    getRequestHarmony();
  }, []);

  // 🔹 페이지 로드 시 localStorage 데이터 가져오기
  const getRequestHarmony = async () => {
    const token = localStorage.getItem("token");
    const taskId = localStorage.getItem("taskId");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/task/search?taskId=${taskId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const harmony = response.data.result.harmonies[0]; // 첫 번째 항목 사용
      setHarmonyInfo({
        musicTitle: harmony.musicTitle,
        harmonyscale: harmony.scale,
        harmonygenre: harmony.genre,
        harmonybpm: harmony.bpm,
        harmonyvoiceColor: harmony.voiceColor,
      });

      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("getRequestHarmony Error:", error);
    }
  };

  return (
    <>
      <ConditionalNavbar /> {/* 변경 */}
      <TitleNavbar title={`${harmonyInfo.musicTitle}의 화성 분석 결과`} />
      <BackGroundResult style={{ height: "100%" }} />
      <Slick
        harmonyscale={harmonyInfo.harmonyscale}
        harmonygenre={harmonyInfo.harmonygenre}
        harmonybpm={harmonyInfo.harmonybpm}
        harmonyvoiceColor={harmonyInfo.harmonyvoiceColor}
      />
      <div
        style={{
          marginTop: "60px",
          justifyContent: "center",
          gap: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "70px",
          }}
        >
          <PrevPurpleButton>
            <Link to="/harmony">이전으로</Link>
          </PrevPurpleButton>

          {/* <StyledPurpleButton>
            <Link to="/audioloading">다운로드</Link>
          </StyledPurpleButton> */}
        </div>
        {/* <Othersystems /> */}
      </div>
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
