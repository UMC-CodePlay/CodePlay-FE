// src/components/Mypg/Menu1.jsx
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Harmonycon from "./harmonycon.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const Menu1 = () => {
  const [harmonyList, setHarmonyList] = useState([]);
  const { token } = useContext(AuthContext);

  // 1) 마운트 시 화성분석 리스트 GET
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://15.164.219.98.nip.io/member/mypage/harmony", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          // originalIndex 추가
          const listWithIndex = res.data.result.map((item, idx) => ({
            ...item,
            originalIndex: idx,
          }));
          setHarmonyList(listWithIndex);
        } else {
          console.error("API 요청 실패:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("API 에러:", err);
      });
  }, [token]);

  // 2) 좋아요 토글
  const handleToggleLike = async (track) => {
    const { harmonyId, musicId, isLiked, originalIndex } = track;
    const newLikeState = !isLiked;

    try {
      let url = "";
      let bodyData = {};

      if (newLikeState) {
        url = "http://15.164.219.98.nip.io/like/add";
        bodyData = { musicId };
      } else {
        url = "http://15.164.219.98.nip.io/like/remove";
        bodyData = { musicId };
      }

      const res = await axios.post(url, bodyData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data.isSuccess) {
        console.error("좋아요 토글 실패:", res.data.message);
        return;
      }

      // 목록 재정렬
      setHarmonyList((prevList) => {
        const newList = [...prevList];
        const index = newList.findIndex((item) => item.harmonyId === harmonyId);
        if (index === -1) return prevList;

        newList[index].isLiked = newLikeState;

        if (newLikeState) {
          // 맨 위로
          const [movedItem] = newList.splice(index, 1);
          newList.unshift(movedItem);
        } else {
          // originalIndex로 복귀
          const [movedItem] = newList.splice(index, 1);
          let targetPos = movedItem.originalIndex;
          if (targetPos < 0) targetPos = 0;
          if (targetPos > newList.length) targetPos = newList.length;
          newList.splice(targetPos, 0, movedItem);
        }

        return newList;
      });
    } catch (error) {
      console.error("좋아요 토글 에러:", error);
    }
  };

  // 3) "삭제하기" 콜백: DELETE /music/${musicId}
  const handleDelete = async (track) => {
    const { harmonyId, musicId } = track;
    try {
      const res = await axios.delete(
        `http://15.164.219.98.nip.io/music/${musicId}`, // ← Path param
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.isSuccess) {
        console.error("삭제 실패:", res.data.message);
        return;
      }

      // 성공 시 목록에서 제거
      setHarmonyList((prevList) =>
        prevList.filter((item) => item.harmonyId !== harmonyId)
      );
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>음원 목록</HeaderLeft>
        <HeaderRight1>

          <HeaderCell>키</HeaderCell>
          </HeaderRight1>
          <HeaderRight2>

          <HeaderCell>BPM</HeaderCell>
          </HeaderRight2>

          <HeaderRight>

          <HeaderCell>즐겨찾기</HeaderCell>
        </HeaderRight>
      </Header>

      {/* harmonyList → harmonycon */}
      {harmonyList.map((item) => (
        <Harmonycon
          key={item.harmonyId}
          track={item}
          onToggleLike={handleToggleLike}
          onDelete={handleDelete}  // ← 추가
        />
      ))}
    </Container>
  );
};

export default Menu1;

/* ------------------ styled-components ------------------ */
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
  flex: 5;
  display: flex;
  justify-content: space-between;
  transform: translateX(102px);
  gap: 30px;
`;
const HeaderRight1 = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-between;
  transform: translateX(260px);
  gap: 30px;
`;
const HeaderRight2 = styled.div`
  flex: 5;
  display: flex;
  justify-content: space-between;
  transform: translateX(208px);
  gap: 30px;
`;
const HeaderCell = styled.span`
  text-align: center;
  flex: 1;
`;
