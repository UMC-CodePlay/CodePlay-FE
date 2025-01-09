import styled from 'styled-components';
import react from 'react-dom';

function Navbar() {
  return (
    <>
      <Container>
        <StyledNavbar>
          <div>이미지 넣을 곳</div>
          <ArrayButtons>
            <ButtonStyle>화성 분석</ButtonStyle>
            <ButtonStyle>악보 생성</ButtonStyle>
            <ButtonStyle>스템 분리</ButtonStyle>
            <ButtonStyle_lg>로그인</ButtonStyle_lg>
            <ButtonStyle_lg>회원가입</ButtonStyle_lg>
          </ArrayButtons>
        </StyledNavbar>
      </Container>
    </>
  );
}
export default Navbar;

const Container = styled.div`
  width: calc(100%-20px);
  left: 0;
  flex-shrink: 0;
  overflow: hidden;
`;

const StyledNavbar = styled.div`
  background-color: #d9d9d9;
  color: black;
  width: 100%;
  height: 100px;
  color: white;
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
  background-color: #d9d9d9;
  color: black;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-left: auto;
  padding-right: 30px;
  align-content: center;
`;

const ButtonStyle = styled.button`
  width: 100px;
  background-color: #d9d9d9;
  font-size: 15px;
  padding: 10px;
  height: 40px !important;
  border: none;
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const ButtonStyle_lg = styled.button`
  background-color: #000000;
  color: #ffffff;
  width: 100px;
  height: 40px;
  border: none;
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #d9d9d9;
    cursor: pointer;
    color: #000000;
  }
  flex-shrink: 0;
`;
