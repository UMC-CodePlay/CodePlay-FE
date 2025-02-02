import styled from "styled-components";

const HomePgSessionButton = styled.button`
  width: 310px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: rgba(17, 90, 247, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

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
    background: linear-gradient(0deg,rgb(14, 78, 214),rgb(14, 78, 214));
  }

  &:active {
    background: #0A47A0;
  }

  &:disabled {
    background: rgba(201, 195, 206, 1);
    cursor: not-allowed;
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

export default HomePgSessionButton;
