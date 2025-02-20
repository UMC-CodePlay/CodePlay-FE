// src/components/Buttons/PurpleButton.jsx
import styled from "styled-components";

const PurpleButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #9747ff 12.5%, #5e00bc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:24px;
  color:white;
  font-weight: 600;
  
  
  a{
  font-family: Pretendard, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: white;
  line-height: normal;
  text-align: center;}

  &:hover {
    background: linear-gradient(180deg, #613fa4 0%, #321a61 100%);
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
    background: linear-gradient(180deg, #9747ff 12.5%, #5e00bc 100%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }
`;

export default PurpleButton;
