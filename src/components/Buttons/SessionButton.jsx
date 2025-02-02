import styled from "styled-components";

const SessionButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #377DEB 0%, #235CD9 87.5%);
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
    background: linear-gradient(180deg, #225AD5 29.66%, #1A42AA 88.98%); 
  }

  &:active {
    background: linear-gradient(143.01deg, #0E23A9 10.03%, #2660DB 91.86%); 
  }

  &:disabled {
    background: linear-gradient(180deg, #377DEB 0%, #235CD9 87.5%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }
`;

export default SessionButton;
