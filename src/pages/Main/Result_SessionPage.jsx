import styled from "styled-components";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import Othersystems from "../../components/Othersystems";
import UploadBox from "../../components/UploadBox";
import { Link } from "react-router-dom";
import "../../components/Buttons/PrimaryButtonBlue.css";
import Audioplay from "../../components/Audioplay";

const Result_ScorePage = () => {
  return (
    <>
      <Navbar />
      <TitleNavbar title="'파일 이름'의 세션 분리 결과"></TitleNavbar>
      <Wrapper>
        <UploadBox></UploadBox>
        <Audioplay></Audioplay>
        <>
          <ButtonContainer>
            <Link to="/session" className="SBL button">
              이전으로
            </Link>
            <Link to="/" className="PBLB button">
              전체 다운로드
            </Link>
          </ButtonContainer>
        </>
      </Wrapper>
      <Othersystems To_other1={"화성 분석"}></Othersystems>
    </>
  );
};

export default Result_ScorePage;

const Container = styled.div``;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: auto;
  align-content: center;
  justify-content: center;
  margin-top: 80px;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 70px;
`;
