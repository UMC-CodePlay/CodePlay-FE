import styled from "styled-components";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import Othersystems from "../../components/Othersystems";
import UploadBox from "../../components/UploadBox";
import { Link } from "react-router-dom";
import Audioplay from "../../components/Audioplay";
import BlueButton from "../../components/Buttons/BlueButton";
import PrevBlueButton from "../../components/Buttons/PrevBlueButton";
import BackGroundResult from "../../components/BackGroundResult";
const Result_ScorePage = () => {
  return (
    <>
      <Navbar />
      <TitleNavbar title="'파일 이름'의 세션 분리 결과"></TitleNavbar>
      <Wrapper>
        <BackGroundResult></BackGroundResult>
        <UploadBox></UploadBox>
        <Audioplay></Audioplay>
        <>
          <ButtonContainer>
            <PrevBlueButton>
              <Link to="/session">이전으로</Link>
            </PrevBlueButton>
            <BlueButton>
              <Link to="/">전체 다운로드</Link>
            </BlueButton>
          </ButtonContainer>
        </>
      </Wrapper>
      <Othersystems To_other1={"화성 분석"}></Othersystems>
    </>
  );
};

export default Result_ScorePage;

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
