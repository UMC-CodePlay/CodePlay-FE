import styled from "styled-components";

const HomeGreenButton = styled.button`
  width: 310px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: #037DBB;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 100px;

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
    background: #037DBB;
  }

  &:active {
    background: #037DBB;
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

export default HomeGreenButton;
