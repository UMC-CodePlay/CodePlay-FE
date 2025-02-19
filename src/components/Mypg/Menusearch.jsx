// Menusearch.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // ★ 추가

const Menu2 = () => {
  const [activeButton, setActiveButton] = useState("화성 분석");
  const navigate = useNavigate(); // ★ useNavigate 훅 사용

  // 버튼 목록
  const buttons = ["화성 분석", "세션 분리"];

  // 버튼 클릭 시
  const handleButtonClick = (button) => {
    setActiveButton(button);

    // ★ 버튼 이름에 따라 경로 분기
    if (button === "화성 분석") {
      navigate("/mypage/mypageharmony/mypagesearchhar");
    } else if (button === "세션 분리") {
      navigate("/mypage/mypagesession/mypagesearchses");
    }
  };

  return (
    <Container>
      <ButtonContainer>
        {buttons.map((button) => (
          <StyledButton
            key={button}
            isActive={activeButton === button}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </StyledButton>
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default Menu2;

// ───────────────────── styled-components ─────────────────────
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  border: 2px solid ${({ isActive }) => (isActive ? "#6F3DA1" : "#C9C3CE")};
  border-radius: 9999px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? "#000000" : "#C9C3CE")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;
