import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Icons from "../../components/Icons";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";

const SessionPage = () => {
  return (
    <div>
      <Navbar />

      <TitleNavbar title="세션 분리" subtitle="세션 분리 내용" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>

      <Icons />

      <div
        style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}
      >
        <PrimaryButton>
          <Link to="/session/result_session">분석하기</Link>
        </PrimaryButton>
      </div>
      <Othersystems></Othersystems>
    </div>
  );
};

export default SessionPage;
