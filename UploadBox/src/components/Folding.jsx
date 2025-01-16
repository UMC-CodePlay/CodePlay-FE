import React, { useState } from "react";
import styled from "styled-components";

const Folding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen); // 상태를 반전
  };

  return (
    <Container>
      <Button onClick={toggleContent}>{isOpen ? "접기" : "펼치기"}</Button>
      <Content isOpen={isOpen}>
        <p>접기</p>
      </Content>
    </Container>
  );
};

export default Folding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Content = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;

  /* 상태에 따라 스타일 변경 */
  max-height: ${({ isOpen }) => (isOpen ? "100px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
`;
