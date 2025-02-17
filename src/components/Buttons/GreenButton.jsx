// src/components/Buttons/GreenButton.jsx
import styled from "styled-components";

const GreenButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #377deb 0%, #037cd9 87.5%);
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: white;
    font-family: Pretendard, sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    text-decoration: none;
  }

  &:hover {
    background: linear-gradient(180deg, #225ad5 29.66%, #1a42aa 88.98%);
  }

  &:active {
    background: linear-gradient(143.01deg, #0e23a9 10.03%, #2660db 91.86%);
  }

  &:disabled {
    background: linear-gradient(180deg, #377deb 0%, #235cd9 87.5%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }
`;

export default GreenButton;
