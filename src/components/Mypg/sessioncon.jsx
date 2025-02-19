// src/components/Mypg/sessioncon.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Playbutton from "../../assets/Mypg_img/Playbutton.svg";
import Downloadbut from "../../assets/Mypg_img/Downloadbut.svg";

/**
 * tracks: [ {
 *   trackId, musicId, musicTitle, createdAt,
 *   vocalUrl, instrumentalUrl, bassUrl, drumsUrl,
 *   isLiked (true/false)
 * }, ...]
 */
const Sessioncon = ({ tracks = [] }) => {
  const { token } = useContext(AuthContext);

  // 서버에서 넘어온 tracks를 로컬 상태로 복사해 관리 (원본 직접 수정 방지)
  const [localTracks, setLocalTracks] = useState([]);

  // 팝업이 열려 있는 트랙의 index
  const [popupVisibleIndex, setPopupVisibleIndex] = useState(null);

  // 처음 렌더링되거나, 상위 컴포넌트에서 tracks가 바뀔 때마다 localTracks를 세팅
  useEffect(() => {
    // originalIndex를 기억해둬야, 즐겨찾기 취소 시 원래 위치로 되돌릴 수 있음
    const mapped = tracks.map((t, i) => ({
      ...t,
      originalIndex: i,
    }));
    setLocalTracks(mapped);
  }, [tracks]);

  // 팝업 열기/닫기
  const togglePopup = (e, index) => {
    e.stopPropagation(); // 상위 div 클릭 이벤트 방지
    if (popupVisibleIndex === index) {
      setPopupVisibleIndex(null);
    } else {
      setPopupVisibleIndex(index);
    }
  };

  // 즐겨찾기 추가 요청
  const handleAddFavorite = async (e, track) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/add",
        { musicId: track.musicId }, // Body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 즐겨찾기 성공 -> 해당 트랙의 isLiked = true로 수정 후 state 반영
        setLocalTracks((prev) =>
          prev.map((t) =>
            t.trackId === track.trackId ? { ...t, isLiked: true } : t
          )
        );
        setPopupVisibleIndex(null);
      } else {
        console.error("즐겨찾기 추가 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 추가 에러:", error);
    }
  };

  // 즐겨찾기 취소 요청
  const handleRemoveFavorite = async (e, track) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await axios.post(
        "http://15.164.219.98.nip.io/like/remove",
        { musicId: track.musicId }, // Body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 즐겨찾기 취소 성공 -> isLiked = false로 수정
        setLocalTracks((prev) =>
          prev.map((t) =>
            t.trackId === track.trackId ? { ...t, isLiked: false } : t
          )
        );
        setPopupVisibleIndex(null);
      } else {
        console.error("즐겨찾기 취소 실패:", res.data.message);
      }
    } catch (error) {
      console.error("즐겨찾기 취소 에러:", error);
    }
  };

  // ✅ 삭제하기 요청 (DELETE /music/{musicId})
  const handleDeleteTrack = async (e, track) => {
    e.stopPropagation();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // path param 형식으로 요청: /music/{musicId}
      const res = await axios.delete(
        `http://15.164.219.98.nip.io/music/${track.musicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 삭제 성공 -> localTracks에서 해당 트랙 제거
        setLocalTracks((prev) => prev.filter((t) => t.trackId !== track.trackId));
        setPopupVisibleIndex(null);
      } else {
        console.error("삭제 실패:", res.data.message);
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  // 세션 확장(보컬/드럼/베이스/MR) 열기/닫기 상태
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  // 다운로드 로직 (단순히 새 탭(혹은 새 창)에서 파일 다운로드)
  const handleDownload = (url) => {
    if (!url) {
      alert("다운로드 URL이 없습니다.");
      return;
    }
    window.open(url, "_blank");
  };

  // localTracks를 정렬하여, isLiked === true인 항목을 최상단으로 올림
  // 단, isLiked 동일하면 originalIndex 기준으로 정렬 (원래 순서 유지)
  const sortedTracks = [...localTracks].sort((a, b) => {
    if (a.isLiked && !b.isLiked) return -1;
    if (!a.isLiked && b.isLiked) return 1;
    return a.originalIndex - b.originalIndex;
  });

  // localTracks가 비어 있으면 안내
  if (sortedTracks.length === 0) {
    return (
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        음원이 없습니다.
      </div>
    );
  }

  return (
    <div>
      {sortedTracks.map((track, index) => {
        const isExpanded = expandedIndexes.includes(index);

        return (
          <div key={track.trackId}>
            {/* 메인 트랙 영역 */}
            <TrackRow onClick={() => toggleExpansion(index)}>
              <TrackInfo>
                <AlbumCover />
                <TrackDetails>
                  <TrackTitle>{track.musicTitle}</TrackTitle>
                  {/* createdAt: "2025-02-19T07:48:02.094Z" 형태이므로 날짜만 자름 */}
                  <TrackDate>{track.createdAt.split("T")[0]}</TrackDate>
                </TrackDetails>
              </TrackInfo>

              <TrackContent>
                {/* 좋아요 버튼 */}
                <LikeButtonWrapper onClick={(e) => togglePopup(e, index)}>
                  <LikeButton>
                    <img
                      src={track.isLiked ? likeButtonOn : likeButtonOff}
                      alt="좋아요 버튼"
                    />
                  </LikeButton>

                  {/* 팝업 */}
                  {popupVisibleIndex === index && (
                    <Popup>
                      <PopupArrow />
                      <PopupContent>
                        <PopupItem>
                        <Link to="/harmony">

                          화성 분석
                          </Link>
                          </PopupItem>
                        {track.isLiked ? (
                          <PopupItem onClick={(e) => handleRemoveFavorite(e, track)}>
                            즐겨찾기 취소
                          </PopupItem>
                        ) : (
                          <PopupItem onClick={(e) => handleAddFavorite(e, track)}>
                            즐겨찾기
                          </PopupItem>
                        )}
                        {/* ✅ 삭제하기 버튼 추가 */}
                        <PopupItem onClick={(e) => handleDeleteTrack(e, track)}>
                          삭제하기
                        </PopupItem>
                      </PopupContent>
                    </Popup>
                  )}
                </LikeButtonWrapper>
              </TrackContent>
            </TrackRow>

            {/* 확장된 세션 영역 (MR / 보컬 / 드럼 / 베이스) */}
            {isExpanded && (
              <ExpandedSession>
                {/* MR */}
                <SessionRowPlayer
                  label="MR"
                  url={track.instrumentalUrl}
                  handleDownload={handleDownload}
                />
                {/* 보컬 */}
                <SessionRowPlayer
                  label="보컬"
                  url={track.vocalUrl}
                  handleDownload={handleDownload}
                />
                {/* 드럼 */}
                <SessionRowPlayer
                  label="드럼"
                  url={track.drumsUrl}
                  handleDownload={handleDownload}
                />
                {/* 베이스 */}
                <SessionRowPlayer
                  label="베이스"
                  url={track.bassUrl}
                  handleDownload={handleDownload}
                />
              </ExpandedSession>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sessioncon;

/* 
  -----------------------------
  하단: 세션 재생(슬라이더, 시간) 담당 컴포넌트 
  -----------------------------
*/
function SessionRowPlayer({ label, url, handleDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // 오디오 객체 생성
  useEffect(() => {
    audioRef.current = new Audio(url);

    const audio = audioRef.current;
    if (!url) {
      // url이 없으면 재생 불가
      return;
    }

    // 메타데이터 로드 시점에 duration 설정
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    // 재생 위치 변경 시점에 currentTime 업데이트
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // 언마운트 시 정리(clean up)
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [url]);

  // 재생/일시정지 토글
  const handlePlayPause = (e) => {
    e.stopPropagation(); // 상위 div 클릭 이벤트 방지
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 슬라이더 변경 시 해당 위치로 오디오 currentTime 이동
  const handleSliderChange = (e) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  // (초 단위) -> mm:ss 로 변환
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <SessionRow>
      <SessionLeft>
        <CategorySquare>
          <CategoryText>{label}</CategoryText>
        </CategorySquare>
        <PlayBtn onClick={handlePlayPause}>
          <PlayBtnImg src={Playbutton} alt="재생/일시정지 버튼" />
        </PlayBtn>
      </SessionLeft>

      <SliderContainer>
        <SessionSlider
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={handleSliderChange}
        />
        <SessionTime>{formatTime(currentTime)}</SessionTime>
      </SliderContainer>

      <DownloadBtn onClick={() => handleDownload(url)}>
        <DownloadBtnImg src={Downloadbut} alt="다운로드 버튼" />
      </DownloadBtn>
    </SessionRow>
  );
}

/* ------------------ styled-components ------------------ */
const TrackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 15px 20px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const TrackInfo = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 15px;
`;
const TrackContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const AlbumCover = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d3d3d3;
  border-radius: 4px;
`;
const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TrackTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
`;
const TrackDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const LikeButtonWrapper = styled.div`
  position: relative;
`;
const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: -70px;
  right: -220px;
  transform: translateX(-50%);
  width: 150px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const PopupArrow = styled.div`
  position: absolute;
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #fff;
`;
const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
  text-align: center;
`;
const PopupItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
  &:last-child {
    color: red;
    font-weight: bold;
  }
`;

/* 확장된 세션 영역 */
const ExpandedSession = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

const SessionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
  transform: translateX(40px);
`;
const SessionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 120px;
`;
const CategorySquare = styled.div`
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transform: translateX(20px);
`;
const CategoryText = styled.div`
  font-size: 12px;
  margin-bottom: 3px;
  transform: translateY(30px);
`;
const PlayBtn = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  transform: translateX(20px);
`;
const PlayBtnImg = styled.img`
  width: 24px;
  height: 24px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  padding: 10px;
  background-color: #f9f8fa;
  height: 40px;
`;
const SessionSlider = styled.input.attrs({ type: "range" })`
  flex: 1;
  margin: 0 10px;
  height: 4px;
  border-radius: 2px;
  background: #ccc;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #6f3da1;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;
const SessionTime = styled.div`
  width: 45px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

const DownloadBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
`;
const DownloadBtnImg = styled.img`
  width: 90px;
  height: 90px;
  transform: translate(20px, -30px);
`;
