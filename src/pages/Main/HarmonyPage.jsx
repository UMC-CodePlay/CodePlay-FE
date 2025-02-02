import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadHarmony from "../../components/UploadHarmony";
import styled from "styled-components";

const HarmonyPage = () => {
  return (
    <div>
      <Navbar />

      <TitleNavbar title="화성 분석" subtitle="내용들" />

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
        style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}
      >
        <PrimaryButton>
          <Link to="/harmony/result_harmony">결과보기</Link>
        </PrimaryButton>
      </div>
      
      <Othersystems />
    </div>
  );
};

export default HarmonyPage;

const BackgroundImage = styled.img`
  width: 100%;
  height: 1080px;
  object-fit: cover; /* 비율 유지하면서 크기 맞춤 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* 다른 요소 위로 올라오지 않도록 뒤로 배치 */
`;