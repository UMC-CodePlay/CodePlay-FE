import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import PurpleButton from "../../components/Buttons/PurpleButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadHarmony from "../../components/UploadHarmony";
import styled from "styled-components";
import BackgroundSvg from "../../assets/HarmonyBg.svg";

const HarmonyPage = () => {
  return (
    <PageContainer>
      <Navbar />

      <TitleNavbar title="화성 분석" subtitle="내용들" />
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadHarmony />
      </div>

      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <PurpleButton>
          <Link to="/harmony/result_harmony">결과보기</Link>
        </PurpleButton>
      </div>

      <Othersystems />
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
`;