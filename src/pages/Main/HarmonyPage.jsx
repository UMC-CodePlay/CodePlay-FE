import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Othersystems from "../../components/Othersystems";
import { Link } from 'react-router-dom';

const HarmonyPage = () => {
  return (
    <div>
      <Navbar />

      <TitleNavbar title="화성 분석" subtitle="내용들" />

      <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>

      <div style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}>
        <PrimaryButton><Link to="result_harmony">분석하기</Link></PrimaryButton>
      </div>
      <Othersystems></Othersystems>
    </div>
  );
};

export default HarmonyPage;
