// Menu1har.jsx
import React from "react";
import styled from "styled-components";
import Harmonycon from "./harmonyconSE.jsx";

const Menu1 = ({ trackList = [] }) => {
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

      {/* trackList가 비어있으면 안내, 아니면 map */}
      {trackList.length === 0 ? (
        <NoResult>검색 결과가 없습니다.</NoResult>
      ) : (
        trackList.map((track) => (
          <Harmonycon key={track.harmonyId} track={track} />
        ))
      )}
    </Container>
  );
};

export default Menu1;

// ───────────────────────── styled-components ─────────────────────────
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

const NoResult = styled.div`
  margin: 20px;
  text-align: center;
  color: #666;
`;
