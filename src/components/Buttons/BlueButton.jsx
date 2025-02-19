// src/components/Buttons/BlueButton.jsx
import styled from "styled-components";

const BlueButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #4f83ff 12.5%, #1a5cff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 버튼 텍스트 스타일 */
  font-family: "Pretendard", sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: white;
  line-height: 1;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: linear-gradient(180deg, #3d6ce6 0%, #153bbf 100%);
  }
  
  &:active {
    background: linear-gradient(
        140.12deg,
        rgba(15, 51, 209, 0.3) 11.62%,
        rgba(255, 255, 255, 0.3) 94.65%
      ),
      linear-gradient(143.01deg, #000068 10.03%, #6f3da1 91.86%);
  }
  
  &:disabled {
    background: linear-gradient(180deg, #4f83ff 12.5%, #1a5cff 100%);
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
  }
`;

export default BlueButton;
