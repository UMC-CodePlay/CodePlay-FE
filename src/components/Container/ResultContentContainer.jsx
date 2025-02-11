import styled from "styled-components";
import Navbar from "../Navbar";
import TitleNavbar from "../TitleNavbar";
import Othersystems from "../Othersystems";
import { Link } from "react-router-dom";
import PurpleButton from "../Buttons/PurpleButton";
import PrevPurpleButton from "../Buttons/PrevPurpleButton";
import BackGroundResult from "../BackGroundResult";

const ResultContentContainer = ({ 
  title, 
  prevLink, 
  otherSystem1, 
  otherSystem2,
  children 
}) => {
  return (
    <>
      <Navbar />
      <TitleNavbar title={title} />
      <Wrapper>
        <BackGroundResult />
        <ContentContainer>
          {children}
          <ButtonContainer>
            <PrevPurpleButton>
              <Link to={prevLink}>이전으로</Link>
            </PrevPurpleButton>
            <StyledPurpleButton>
              <Link to="/audioloading">다운로드</Link>
            </StyledPurpleButton>
          </ButtonContainer>
        </ContentContainer>
      </Wrapper>
      <Othersystems To_other1={otherSystem1} To_other2={otherSystem2} />
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: auto;
  align-content: center;
  justify-content: center;
  margin-top: 80px;
  gap: 30px;
`;

const ContentContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 70px;
`;

const StyledPurpleButton = styled(PurpleButton)`
  width: 160px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
`;

export default ResultContentContainer; 