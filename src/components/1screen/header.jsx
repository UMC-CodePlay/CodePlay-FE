// src/components/1screen/header.jsx

import "./header.css";
import PrimaryButton from "../Buttons/PurpleButton";
import SessionButton from "../Buttons/BlueButton";
import GreenButton from "../Buttons/GreenButton";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bgLogo from "../../assets/Landing_img/bg_logo.svg";

const Header = () => {
  return (
    <HeaderContainer className="header container">
      {/* 이미지 태그를 먼저 배치하면, 기본 흐름상 버튼들 위쪽에 위치 */}
      <StyledLogo src={bgLogo} alt="Logo" />

      <ButtonContainer>
        <StyledPrimaryButton>
          <Link to="/harmony">화성분석 하러가기 →</Link>
        </StyledPrimaryButton>
        <StyledSessionButton>
          <Link to="/session">세션분리 하러가기 →</Link>
        </StyledSessionButton>
        <StyledGreenButton>
          <Link to="/remixing">리믹싱 하러가기 →</Link>
        </StyledGreenButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;

/* ====== styled-components ====== */
const HeaderContainer = styled.header`
  text-align: center;
  padding: 40px 0;
`;

const StyledLogo = styled.img`
  display: block;
  margin: 0 auto 20px;
  width: 813px;
  height: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  margin-top: 20px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 300px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 50px;
  a {
    color: #ffffff;     
    text-decoration: none; 
  }
`;

const StyledSessionButton = styled(SessionButton)`
  width: 300px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 50px;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const StyledGreenButton = styled(GreenButton)`
  width: 300px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 50px;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;
