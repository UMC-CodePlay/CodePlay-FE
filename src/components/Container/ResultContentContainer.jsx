// src/components/Container/ResultContentContainer.jsx
import React from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import TitleNavbar from "../TitleNavbar";
import Othersystems from "../Othersystems";
import { Link } from "react-router-dom";
import PurpleButton from "../Buttons/PurpleButton";
import PrevPurpleButton from "../Buttons/PrevPurpleButton";
import BackGroundResult from "../BackGroundResult";
import OneAudioplay from "../oneAudioplay";  // oneAudioplay.jsx 임포트

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
            {/* 필요 시 버튼 추가 */}
            {/* <PrevPurpleButton>
              <Link to={prevLink}>이전으로</Link>
            </PrevPurpleButton>
            <StyledPurpleButton>
              <Link to="/audioloading">다운로드</Link>
            </StyledPurpleButton> */}
          </ButtonContainer>
        </ContentContainer>
      </Wrapper>
      {/* OneAudioplay 컴포넌트를 ContentContainer와 동일한 폭으로 추가 */}
      <OneAudioplayWrapper>
        <OneAudioplay />
      </OneAudioplayWrapper>
      {/* <Othersystems To_other1={otherSystem1} To_other2={otherSystem2} /> */}
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
  background-color: #2D2D3F;
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

// OneAudioplayWrapper를 ContentContainer와 동일한 폭으로 설정
const OneAudioplayWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 0;
`;

export default ResultContentContainer;
