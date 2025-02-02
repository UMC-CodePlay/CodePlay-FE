import styled from "styled-components";

const FileSelectButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>파일 선택</StyledButton>;
};

export default FileSelectButton;

const StyledButton = styled.button`
  width: 128px;
  height: 39px;
  padding: 10px 0px;
  gap: 10px;
  border-radius: 30px;
  border: 1.5px solid black;
  background: rgba(57, 57, 73, 1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(77, 77, 99, 1);
  }

  &:active {
    background: rgba(37, 37, 53, 1);
  }

  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
`;
