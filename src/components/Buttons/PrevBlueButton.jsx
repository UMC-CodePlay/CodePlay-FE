import styled from "styled-components";

const PrevBlueButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
  border: 2px solid rgba(35, 92, 217, 1);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    font-family: Pretendard, sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: 28.64px;
    text-align: center;
    text-decoration: none;
    color: rgba(35, 92, 217, 1);
  }
`;

export default PrevBlueButton;
