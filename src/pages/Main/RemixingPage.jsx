import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import PurpleButton from "../../components/Buttons/PurpleButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadRemixing from "../../components/UploadRemixing";
import styled from "styled-components";

const RemixingPage = () => {
  return (
    <PageContainer>
      <Navbar />
      <TitleNavbar
        title="리믹싱"
        subtitle="음원의 볼륨, 음색, 이펙터를 조절하여 나만의 음악을 만들어보세요!"
      />

      <ContentContainer>
        <UploadRemixing />

        <ButtonContainer>
          <StyledPurpleButton>
            <Link to="/remixing/result_remixing">결과보기</Link>
          </StyledPurpleButton>
        </ButtonContainer>
      </ContentContainer>

      <Othersystems To_other1={"화성 분석"} To_other2={"세션 분리"} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const StyledPurpleButton = styled(PurpleButton)`
  width: 160px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
`;

export default RemixingPage;
