// MypageSERli.jsx
import React from "react";
import styled from "styled-components";
import Harmonycon from "./harmonyconentire.jsx";
import Sessioncon from "./sessionconentire.jsx";

/**
 * harmonies: 화성분석 배열
 * tracks: 세션분리 배열
 */
const Mypageser = ({ harmonies = [], tracks = [] }) => {
  // 1) 둘 다 비어 있으면 안내
  if (harmonies.length === 0 && tracks.length === 0) {
    return (
      <Container>
        <NoResult>검색 결과가 없습니다.</NoResult>
      </Container>
    );
  }

  // 2) harmonies만 있을 때
  if (harmonies.length > 0 && tracks.length === 0) {
    return (
      <Container>
        {/* 화성분석 컴포넌트에 harmonies 넘겨서 map으로 표시할 수도 있음 */}
        {harmonies.map((harmonyItem, idx) => (
          <Harmonycon key={idx} data={harmonyItem} />
        ))}
      </Container>
    );
  }

  // 3) tracks만 있을 때
  if (tracks.length > 0 && harmonies.length === 0) {
    return (
      <Container>
        {tracks.map((trackItem, idx) => (
          <Sessioncon key={idx} data={trackItem} />
        ))}
      </Container>
    );
  }

  // 4) 둘 다 있을 때 (화성 + 세션 모두)
  return (
    <Container>
      {/* 화성분석 */}
      {harmonies.map((harmonyItem, idx) => (
        <Harmonycon key={`h-${idx}`} data={harmonyItem} />
      ))}

      {/* 세션분리 */}
      {tracks.map((trackItem, idx) => (
        <Sessioncon key={`t-${idx}`} data={trackItem} />
      ))}
    </Container>
  );
};

export default Mypageser;

// Styled-components
const Container = styled.div`
  width: 58%;
  margin: 0 auto;
  padding-top: 20px;
`;

const NoResult = styled.div`
  margin: 20px;
  text-align: center;
  color: #666;
  font-size: 16px;
`;
