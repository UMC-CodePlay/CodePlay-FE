import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/SessionButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadSession from "../../components/UploadSession";

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
        <UploadSession />
      </div>

      <div
        style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}
      >
        <SessionButton>
          <Link to="/session/result_session">결과보기</Link>
        </SessionButton>
      </div>
      <Othersystems></Othersystems>
    </div>
  );
};

export default SessionPage;
