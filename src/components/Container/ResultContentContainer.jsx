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
import OneAudioplay from "../oneAudioplay"; // oneAudioplay.jsx 임포트

const ResultContentContainer = ({
  title,
  prevLink,
  otherSystem1,
  otherSystem2,
  children,
}) => {
  return (
    <>
      <Navbar />
      <TitleNavbar title={title} />
      <Wrapper>
        <BackGroundResult />
        
        {/* --- 메인 콘텐츠 컨테이너 --- */}
        <ContentContainer>
          {/* 상단에 표시할 내용(children) */}
          {children}

          {/* 필요한 경우 버튼 (주석 해제 가능)
          <ButtonContainer>
            <PrevPurpleButton>
              <Link to={prevLink}>이전으로</Link>
            </PrevPurpleButton>
            <StyledPurpleButton>
              <Link to="/audioloading">다운로드</Link>
            </StyledPurpleButton>
          </ButtonContainer>
          */}

          {/* --- OneAudioplay를 바로 ContentContainer 하단에 추가 --- */}
          <PlayerContainer>
            <OneAudioplay />
          </PlayerContainer>
        </ContentContainer>
      </Wrapper>
      
      {/* 필요하다면 아래도 주석 해제
      <Othersystems To_other1={otherSystem1} To_other2={otherSystem2} />
      */}
    </>
  );
};

export default ResultContentContainer;

/* ========= styled-components ========= */

/** 가장 바깥 래퍼 */
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: auto;
  align-content: center;
  justify-content: center;
  margin-top: 80px;
  gap: 30px;
`;

/** 메인 콘텐츠 영역 */
const ContentContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #2d2d3f;
`;

/** 버튼 컨테이너 (필요 시 주석 해제) */
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

/** 
 * OneAudioplay가 들어갈 영역 
 * ContentContainer의 폭(최대 1200px) 내에서 가로 100%를 사용 
 */
const PlayerContainer = styled.div`
  width: 100%;
  margin-top: 40px; /* 위 내용과의 간격 */
`;
