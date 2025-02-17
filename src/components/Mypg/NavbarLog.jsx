// src/components/Mypg/NavbarLog.jsx
import styled from "styled-components";
import Logo from "../../assets/Logo_img/logo.svg";
import { Link } from "react-router-dom";
import { useNavbar } from "../../context/NavbarContext";

function NavbarLog({ logout }) {
  // 여전히 resetNavbar도 쓰고 싶다면 사용
  const { resetNavbar } = useNavbar(); 

  // 로그아웃 버튼 클릭 시 두 함수를 모두 실행
  const handleLogout = () => {
    resetNavbar();   // 기존 NavbarContext 초기화
    logout();        // AuthContext에서 token 제거 → Navbar로 돌아감
  };

  return (
    <Container>
      <StyledNavbar>
        <StyledButton>
          <Link to="/">
            <img src={Logo} />
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
            <StyledLink to="/mypage">마이페이지</StyledLink>
          </ButtonStyle>
          
          {/* ▼ handleLogout 실행 */}
          <ButtonStyle_su onClick={handleLogout}>로그아웃</ButtonStyle_su>
        </ArrayButtons>
      </StyledNavbar>
    </Container>
  );
}

export default NavbarLog;

/* --------------- 스타일들 --------------- */
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
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

const ButtonStyle_su = styled.button`
  background-color: #ffffff;
  color: #00000;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  &:hover {
    background-color: #d9d9d9;
    cursor: pointer;
    color: #000000;
  }
  flex-shrink: 0;
  border: 1px solid #000;
`;
