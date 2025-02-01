import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Harmonycon from "./harmonycon.jsx"


const Menu1 = () => {
  

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderLeft>음원 목록</HeaderLeft>
        <HeaderRight>
          <HeaderCell>키</HeaderCell>
          <HeaderCell>BPM</HeaderCell>
          <HeaderCell>평균 음압</HeaderCell>
          <HeaderCell>즐겨찾기</HeaderCell>
        </HeaderRight>
      </Header>

      <Harmonycon/>
      <Harmonycon/>
      

    </Container>
  );
};

export default Menu1;

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
`;

const HeaderRight = styled.div`
  flex: 4;
  display: flex;
  justify-content: space-between;
  transform: translateX(10px);
  gap: 30px;
`;

const HeaderCell = styled.span`
  text-align: center;
  flex: 1;
`;

