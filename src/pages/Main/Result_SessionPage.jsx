// src/pages/Main/Result_SessionPage.jsx
import styled from "styled-components";
import ConditionalNavbar from "../../components/ConditionalNavbar"; // 수정
import TitleNavbar from "../../components/TitleNavbar";
import Othersystems from "../../components/Othersystems";
import UploadBox from "../../components/UploadBox";
import { Link } from "react-router-dom";
import Audioplay from "../../components/Audioplay";
import BlueButton from "../../components/Buttons/BlueButton";
import PrevBlueButton from "../../components/Buttons/PrevBlueButton";
import BackGroundResult from "../../components/BackGroundResult";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Result_SessionPage = () => {
  const [fileInfo, setFileInfo] = useState({
    fileName: "",
    fileSize: "",
  });
  const [sessionInfo, setSessionInfo] = useState({
    vocalUrl: "",
    instrumentUrl: "",
    bassUrl: "",
    drumsUrl: "",
  });

  useEffect(() => {
    const storedFile = localStorage.getItem("uploadFile");
    if (storedFile) {
      setFileInfo(JSON.parse(storedFile));
      getRequestSession();
    }
  }, []);

  const getRequestSession = async () => {
    const token = localStorage.getItem("token");
    const taskId = localStorage.getItem("taskId");

    try {
      const response = await axios.get(`${API_BASE_URL}/task/search`, {
        params: { taskId: taskId },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const session = response.data.result.tracks[0];
      setSessionInfo({
        vocalUrl: session.vocalUrl,
        instrumentUrl: session.instrumentUrl,
        bassUrl: session.bassUrl,
        drumsUrl: session.durmsUrl,
      });

      console.log("응답 데이터:", response.data);
      console.log("응답 seesion:", session);
    } catch (error) {
      console.log("getRequestSession Error", error);
    }
  };

  return (
    <>
      <ConditionalNavbar />
      <TitleNavbar title=" 세션 분리 결과" />
      <Wrapper>
        <BackGroundResult />
        {/* <UploadBox /> */}
        <Audioplay
          vocalUrl={sessionInfo.vocalUrl}
          instrumentalUrl={sessionInfo.instrumentUrl}
          bassUrl={sessionInfo.bassUrl}
          drumsUrl={sessionInfo.drumsUrl}
        />
        <ButtonContainer>
          <PrevBlueButton>
            <Link to="/session">이전으로</Link>
          </PrevBlueButton>
          <BlueButton>
            <Link to="/">전체 다운로드</Link>
          </BlueButton>
        </ButtonContainer>
      </Wrapper>
      {/* <Othersystems To_other1={"화성 분석"} /> */}
    </>
  );
};

export default Result_SessionPage;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 80px;
  gap: 30px;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 70px;
`;
