import React, { useState } from "react";
import styled from "styled-components";
import Sessioncon from "./sessioncon.jsx";

const Menu1 = () => {

  
   
  


  return (
    <div>
    <Small>업로드한 음원 파일의 저장 기한은 14일입니다. 음원 파일은 작업일로부터 14일 이후 목록에서 사라집니다.</Small>
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderLeft>음원 목록</HeaderLeft>
        <HeaderRight>
          <HeaderCell>즐겨찾기</HeaderCell>
        </HeaderRight>
      </Header>

      <Sessioncon/>


      
    </Container>
    </div>
  );
};

export default Menu1;
const Small = styled.div`
  width: 100%;
  text-align: center; /* 가운데 정렬 */
  font-size: 11px; /* 글자 크기 */
  color: rgba(201, 195, 206, 1); /* 텍스트 색상 */
  margin-top: -5px; /* 위쪽 여백 */
  margin-bottom: -10px;
  line-height: 1.5; /* 줄 간격 */
  transform: translateX(160px);
`;

// Styled-components
const Container = styled.div`
  width: 58%;
  margin: 0 auto;
  padding-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(201, 195, 206, 1);
  height: 10px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  border-radius: 10px;
`;

const HeaderLeft = styled.div`
  flex: 3;
  text-align: left;
  transform: translateX(10px);

`;

const HeaderRight = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-between;
  transform: translateX(200px);
`;

const HeaderCell = styled.span`
  text-align: center;
  flex: 1;
`;


