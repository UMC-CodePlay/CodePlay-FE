import styled from "styled-components";
import Logo from "../assets/Logo_img/logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Container>
      <StyledNavbar>
        <StyledButton>
          <Link to="/">
            <img src={Logo} alt="홈 로고" />
          </Link>
        </StyledButton>
        <ArrayButtons>
          <ButtonStyle>
            <StyledLink to="/harmony">화성 분석</StyledLink>
          </ButtonStyle>
          <ButtonStyle>
            <StyledLink to="/session">세션 분리</StyledLink>
          </ButtonStyle>  
          <ButtonStyle>
            <StyledLink to="/remixing">리믹싱</StyledLink>
          </ButtonStyle>
          <ButtonStyle>
            <StyledLink to="/signup">회원가입</StyledLink>
          </ButtonStyle>
          <ButtonStyle>
            <StyledLink to="/login">로그인</StyledLink>
          </ButtonStyle>
        </ArrayButtons>
      </StyledNavbar>
    </Container>
  );
}

export default Navbar;

/* --------------- 스타일 --------------- */
const Container = styled.div`
  width: calc(100%-20px);
  left: 0;
  flex-shrink: 0;
  overflow: hidden;
`;

const StyledNavbar = styled.div`
  background-color: #ffffff;
  color: black;
  width: 100%;
  height: 85px;
  position: fixed;
  display: flex;
  top: 0;
  z-index: 1000;
  left: 0;
  justify-content: space-between;
  align-content: center;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  margin: 20px 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    margin: 20px 20px;
    width: 50px;
    height: 50px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ArrayButtons = styled.div`
  display: grid;
  background-color: #ffffff;
  color: black;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-left: auto;
  padding-right: 20px;
  align-content: center;
`;

const ButtonStyle = styled.button`
  width: 100px;
  background-color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  height: 40px !important;
  border: none;
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  display: flex;
  padding: 25px 0px 20px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
