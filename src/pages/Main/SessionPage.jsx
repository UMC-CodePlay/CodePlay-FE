import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/BlueButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/SessionBg.svg";
import styled from "styled-components";

const SessionPage = () => {
  return (
    <PageContainer>

      <TitleNavbar title="세션 분리" subtitle="세션 분리 내용" />
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadSession />
      </div>

      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <SessionButton>
          <Link to="/session/result_session">결과보기</Link>
        </SessionButton>
      </div>
      <Othersystems></Othersystems>
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
  min-height: 600px; 
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 400px;
  left: 0;
  z-index: -1;
`;