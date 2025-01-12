import Navbar from "../components/Navbar";
import TitleNavbar from "../components/TitleNavbar";
import UploadBox from "../components/UploadBox";
import Button from "../components/Button";
import Othersystems from "../components/Othersystems";
const HarmonyPage = () => {
  return (
    <>
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
          <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
        </div>
        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button>분석하기</Button>
        </div>

        {/*------------- othersystems 실험을 위한 태그 ----------*/}
      </div>

      <Othersystems
        DF_subtitle="코드 플레이의 다른 기능 살펴보기"
        To_other1="세션 분리"
        To_other2="악보 생성"
      ></Othersystems>
    </>
  );
};

export default HarmonyPage;
