// src/pages/Main/SessionPage.jsx
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/BlueButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/sessionBack.svg";
import styled from "styled-components";

const SessionPage = () => {
  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경 */}
      <TitleNavbar title="세션 분리" subtitle="딥러닝 모델이 원곡의 트랙을 분리합니다." />
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
        <UploadSession />
      </div>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <SessionButton>
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