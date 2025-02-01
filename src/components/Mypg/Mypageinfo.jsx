import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/Mypg_img/arrow.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* 가로 화면을 채우기 */
  margin: 85px 0px 0px 0px; /* 위아래 간격 */
  position: relative; /* 뒤로가기 버튼 위치를 위한 설정 */
`;

const BackButton = styled.button`
  position: absolute;
  left: 490px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Line = styled.div`
  width: 100%; /* 가로 화면을 채우기 */
  height: 1px; /* 선 두께 */
  background-color: #ddd; /* 회색 선 색상 */
`;

const Text = styled.div`
  margin: 15px 0; /* 위아래 선과 텍스트 간격 */
  color: #000; /* 텍스트 색상 */
  font-size: 20px; /* 텍스트 크기 */
  font-weight: bold;
`;

const MyPageTitle = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <img src={arrowIcon} alt="뒤로가기" />
      </BackButton>
      <Line />
      <Text>회원정보 수정</Text>
      <Line />
    </Container>
  );
};

export default MyPageTitle;
