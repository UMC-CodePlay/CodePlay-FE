import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%; /* 가로 화면을 채우기 */
  margin: 85px 0px 40px 0px; /* 위아래 간격 */
`;

const Line = styled.div`
  width: 100%; /* 가로 화면을 채우기 */
  height: 1px; /* 선 두께 */
  background-color: #ddd; /* 회색 선 색상 */
`;

const Text = styled.div`
  margin: 15px 0; /* 위아래 선과 텍스트 간격 */
  color: #000; /* 텍스트 색상 */
  font-size: 20px; /* 텍스트 크기 */
  font-weight: bold;
`;

const MyPageTitle = () => {
  return (
    <Container>
      <Line />
      <Text>마이페이지</Text>
      <Line />
    </Container>
  );
};

export default MyPageTitle;
