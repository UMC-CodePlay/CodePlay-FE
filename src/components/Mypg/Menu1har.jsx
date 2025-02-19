// src/components/Mypg/Menu1har.jsx
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import HarmonyconSE from "./harmonyconSE.jsx";

const Menu1har = ({ trackList = [] }) => {
  const { token } = useContext(AuthContext);

  // 로컬 상태에 검색 결과 복사 + originalIndex 저장
  const [localTracks, setLocalTracks] = useState([]);

  useEffect(() => {
    const mapped = trackList.map((t, i) => ({
      ...t,
      originalIndex: i, // 기존 순서 기억
    }));
    setLocalTracks(mapped);
  }, [trackList]);

  // 1) 즐겨찾기 추가 (POST /like/add)
  const handleAddFavorite = async (track) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/add",
        { musicId: track.musicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 성공하면 isLiked = true로 변경
        setLocalTracks((prev) =>
          prev.map((t) =>
            t.harmonyId === track.harmonyId ? { ...t, isLiked: true } : t
          )
        );
      } else {
        console.error("즐겨찾기 추가 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 추가 에러:", error);
    }
  };

  // 2) 즐겨찾기 취소 (POST /like/remove)
  const handleRemoveFavorite = async (track) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/remove",
        { musicId: track.musicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 성공하면 isLiked = false로 변경
        setLocalTracks((prev) =>
          prev.map((t) =>
            t.harmonyId === track.harmonyId ? { ...t, isLiked: false } : t
          )
        );
      } else {
        console.error("즐겨찾기 취소 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 취소 에러:", error);
    }
  };

  // 3) 최종 정렬: isLiked=true면 상단, 동일 isLiked끼리는 originalIndex 순서
  const sortedTracks = [...localTracks].sort((a, b) => {
    if (a.isLiked && !b.isLiked) return -1;
    if (!a.isLiked && b.isLiked) return 1;
    return a.originalIndex - b.originalIndex;
  });

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <HeaderLeft>음원 목록</HeaderLeft>
        <HeaderRight>
          <HeaderCell>키</HeaderCell>
        </HeaderRight>
        <HeaderRight1>
          <HeaderCell>BPM</HeaderCell>
        </HeaderRight1>
        <HeaderRight2>
          <HeaderCell>즐겨찾기</HeaderCell>
        </HeaderRight2>
      </Header>

      {/* trackList가 비어있으면 안내, 아니면 map */}
      {sortedTracks.length === 0 ? (
        <NoResult>검색 결과가 없습니다.</NoResult>
      ) : (
        sortedTracks.map((track) => (
          <HarmonyconSE
            key={track.harmonyId}
            track={track}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))
      )}
    </Container>
  );
};

export default Menu1har;

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
  transform: translateX(225px);
  gap: 30px;
`;
const HeaderRight1 = styled.div`
  flex: 4;
  display: flex;
  justify-content: space-between;
  transform: translateX(193px);
  gap: 30px;
`;
const HeaderRight2 = styled.div`
  flex: 4;
  display: flex;
  justify-content: space-between;
  transform: translateX(95px);
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
