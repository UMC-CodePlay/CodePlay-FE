// Menu1.jsx
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios"; 
import Harmonycon from "./harmonycon.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";


const Menu1 = () => {
  // 1) 서버에서 받아온 화성 분석 리스트
  const [harmonyList, setHarmonyList] = useState([]);
  const { token } = useContext(AuthContext);
  

  // 2) 컴포넌트가 처음 렌더링될 때 API GET 호출
  useEffect(() => {
    axios
      .get("http://15.164.219.98.nip.io/member/mypage/harmony",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← 토큰 추가
          },
        }
      )
      .then((res) => {
        const data = res.data;
        if (data.isSuccess) {
          // 성공 시 harmonyList 갱신
          setHarmonyList(data.result);
        } else {
          console.error("API 요청 실패:", data.message);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, [token]);

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

      {/* 3) 가져온 harmonyList를 map으로 순회하여 Harmonycon 렌더링 */}
      {harmonyList.map((harmonyData) => (
        <Harmonycon key={harmonyData.harmonyId} track={harmonyData} />
      ))}
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
