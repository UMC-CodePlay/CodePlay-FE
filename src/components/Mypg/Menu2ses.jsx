// Menu2ses.jsx
import React from "react";
import styled from "styled-components";
import Sessioncon from "./sessionconSE.jsx";

const Menu1 = ({ trackList = [] }) => {
  return (
    <div>
      <Small>
        업로드한 음원 파일의 저장 기한은 14일입니다. 음원 파일은 작업일로부터
        14일 이후 목록에서 사라집니다.
      </Small>
      <Container>
        {/* 헤더 */}
        <Header>
          <HeaderLeft>음원 목록</HeaderLeft>
          <HeaderRight>
            <HeaderCell>즐겨찾기</HeaderCell>
          </HeaderRight>
        </Header>

        {/* trackList 없으면 안내, 있으면 Sessioncon */}
        {trackList.length === 0 ? (
          <NoResult>검색 결과가 없습니다.</NoResult>
        ) : (
          <Sessioncon trackList={trackList} />
        )}
      </Container>
    </div>
  );
};

export default Menu1;

const Small = styled.div`
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: rgba(201, 195, 206, 1);
  margin-top: -5px;
  margin-bottom: -10px;
  line-height: 1.5;
  transform: translateX(280px);
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
  transform: translateX(290px);
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
