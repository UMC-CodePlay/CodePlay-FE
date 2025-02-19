// src/components/Mypg/MypageSERli.jsx
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

// 하위 UI 컴포넌트
import Harmonycon from "./harmonyconentire.jsx";
import Sessioncon from "./sessionconentire.jsx";

const Mypageser = ({ harmonies = [], tracks = [] }) => {
  const { token } = useContext(AuthContext);

  // 로컬 state
  const [localHarmonies, setLocalHarmonies] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  // 마운트(또는 props 변경) 시, originalIndex 추가
  useEffect(() => {
    setLocalHarmonies(
      harmonies.map((item, index) => ({
        ...item,
        originalIndex: index,
      }))
    );
  }, [harmonies]);

  useEffect(() => {
    setLocalTracks(
      tracks.map((item, index) => ({
        ...item,
        originalIndex: index,
      }))
    );
  }, [tracks]);

  // ---------------------------
  // 1) 즐겨찾기 추가 (POST /like/add)
  // ---------------------------
  const handleAddFavorite = async (musicId, isHarmony) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/add",
        { musicId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.isSuccess) {
        if (isHarmony) {
          setLocalHarmonies((prev) =>
            prev.map((h) => (h.musicId === musicId ? { ...h, isLiked: true } : h))
          );
        } else {
          setLocalTracks((prev) =>
            prev.map((t) => (t.musicId === musicId ? { ...t, isLiked: true } : t))
          );
        }
      } else {
        console.error("즐겨찾기 추가 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 추가 에러:", error);
    }
  };

  // ---------------------------
  // 2) 즐겨찾기 취소 (POST /like/remove)
  // ---------------------------
  const handleRemoveFavorite = async (musicId, isHarmony) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/remove",
        { musicId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.isSuccess) {
        if (isHarmony) {
          setLocalHarmonies((prev) =>
            prev.map((h) => (h.musicId === musicId ? { ...h, isLiked: false } : h))
          );
        } else {
          setLocalTracks((prev) =>
            prev.map((t) => (t.musicId === musicId ? { ...t, isLiked: false } : t))
          );
        }
      } else {
        console.error("즐겨찾기 취소 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 취소 에러:", error);
    }
  };

  // ---------------------------
  // 3) 삭제하기 (DELETE /music/{musicId})
  // ---------------------------
  const handleDelete = async (musicId, isHarmony) => {
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      // path param으로 musicId 전송
      const res = await axios.delete(
        `http://15.164.219.98.nip.io/music/${musicId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.isSuccess) {
        // 성공 시, 로컬 state에서 제거
        if (isHarmony) {
          setLocalHarmonies((prev) => prev.filter((h) => h.musicId !== musicId));
        } else {
          setLocalTracks((prev) => prev.filter((t) => t.musicId !== musicId));
        }
      } else {
        console.error("삭제 실패:", res.data.message);
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  // ---------------------------
  // 4) 정렬 (isLiked === true → 맨 위, 그 외 originalIndex 순)
  // ---------------------------
  const sortHarmonies = () => {
    return [...localHarmonies].sort((a, b) => {
      if (a.isLiked && !b.isLiked) return -1;
      if (!a.isLiked && b.isLiked) return 1;
      return a.originalIndex - b.originalIndex;
    });
  };
  const sortTracks = () => {
    return [...localTracks].sort((a, b) => {
      if (a.isLiked && !b.isLiked) return -1;
      if (!a.isLiked && b.isLiked) return 1;
      return a.originalIndex - b.originalIndex;
    });
  };

  // 최종 정렬
  const sortedHarmonies = sortHarmonies();
  const sortedTracks = sortTracks();

  // ---------------------------
  // 5) 케이스별 렌더링
  // ---------------------------
  if (sortedHarmonies.length === 0 && sortedTracks.length === 0) {
    return (
      <Container>
        <NoResult>검색 결과가 없습니다.</NoResult>
      </Container>
    );
  }

  if (sortedHarmonies.length > 0 && sortedTracks.length === 0) {
    return (
      <Container>
        {sortedHarmonies.map((h) => (
          <Harmonycon
            key={h.harmonyId || h.musicId}
            data={h}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            onDelete={handleDelete}
          />
        ))}
      </Container>
    );
  }

  if (sortedHarmonies.length === 0 && sortedTracks.length > 0) {
    return (
      <Container>
        {sortedTracks.map((t) => (
          <Sessioncon
            key={t.trackId || t.musicId}
            data={t}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            onDelete={handleDelete}
          />
        ))}
      </Container>
    );
  }

  // 둘 다 있음
  return (
    <Container>
      {sortedHarmonies.map((h) => (
        <Harmonycon
          key={h.harmonyId || h.musicId}
          data={h}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onDelete={handleDelete}
        />
      ))}
      {sortedTracks.map((t) => (
        <Sessioncon
          key={t.trackId || t.musicId}
          data={t}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          onDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

export default Mypageser;

/* ───────────────────────── styled-components ───────────────────────── */
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
