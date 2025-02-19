// src/components/Mypg/Menu2.jsx
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Sessioncon from "./sessioncon.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const Menu2 = () => {
  // 1) API로 받아온 트랙 리스트
  const [tracks, setTracks] = useState([]);
  const { token } = useContext(AuthContext);

  // 2) 컴포넌트가 처음 렌더링될 때 GET 요청
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://15.164.219.98.nip.io/member/mypage/track", {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setTracks(res.data.result); // result: [{ trackId, musicId, musicTitle, createdAt, vocalUrl, instrumentalUrl, bassUrl, drumsUrl, ...}]
        } else {
          console.error("API 요청 실패:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, [token]);

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

        {/* 트랙 데이터를 Sessioncon에 전달 */}
        <Sessioncon tracks={tracks} />
      </Container>
    </div>
  );
};

export default Menu2;

/* ------------------ styled-components ------------------ */
const Small = styled.div`
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: rgba(201, 195, 206, 1);
  margin-top: -5px;
  margin-bottom: -10px;
  line-height: 1.5;
  transform: translateX(250px);
`;

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
  transform: translateX(1px);
`;

const HeaderRight = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-between;
  transform: translateX(300px);
`;

const HeaderCell = styled.span`
  text-align: center;
  flex: 1;
`;
