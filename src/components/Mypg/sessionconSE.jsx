// src/components/Mypg/sessionconSE.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";


import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Playbutton from "../../assets/Mypg_img/Playbutton.svg";
import Downloadbut from "../../assets/Mypg_img/Downloadbut.svg";

// ✅ 토큰 사용을 위해 AuthContext 가져오기
import { AuthContext } from "../../context/AuthContext.jsx";

/**
 * trackList: [
 *   {
 *     trackId: 0,
 *     musicId: 0,
 *     musicTitle: "string",
 *     createdAt: "2025-02-19T10:02:23.640Z",
 *     vocalUrl: "string",
 *     instrumentalUrl: "string",
 *     bassUrl: "string",
 *     drumsUrl: "string",
 *     isLiked: true
 *   },
 *   ...
 * ]
 */
const Sessioncon = ({ trackList = [] }) => {
  const { token } = useContext(AuthContext); // 로그인 토큰
  // 로컬 상태: trackList 복사본
  const [localTracks, setLocalTracks] = useState([]);

  // 확장된 세션 인덱스
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  // 팝업 표시 인덱스
  const [popupVisibleIndex, setPopupVisibleIndex] = useState(null);
  // 좋아요 인덱스 (UI용)
  const [likedIndexes, setLikedIndexes] = useState([]);

  // ---------------------------
  // 1) 첫 렌더 or trackList 변경 시 localTracks 설정
  // ---------------------------
  useEffect(() => {
    setLocalTracks(trackList);
  }, [trackList]);

  // ---------------------------
  // 2) 세션 확장 토글
  // ---------------------------
  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  // ---------------------------
  // 3) 팝업 토글
  // ---------------------------
  const togglePopup = (index, e) => {
    e.stopPropagation();
    if (popupVisibleIndex === index) {
      setPopupVisibleIndex(null);
    } else {
      setPopupVisibleIndex(index);
    }
  };

  // ---------------------------
  // 4) 좋아요 토글 (UI상)
  // ---------------------------
  const toggleLike = (index) => {
    if (likedIndexes.includes(index)) {
      setLikedIndexes(likedIndexes.filter((i) => i !== index));
    } else {
      setLikedIndexes([...likedIndexes, index]);
    }
    setPopupVisibleIndex(null);
  };

  // ---------------------------
  // 5) 삭제하기 (DELETE /music/{musicId})
  // ---------------------------
  const handleDeleteTrack = async (e, track) => {
    e.stopPropagation(); // 상위 div 클릭 방지
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      // musicId를 path param으로
      const res = await axios.delete(
        `http://15.164.219.98.nip.io/music/${track.musicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.isSuccess) {
        // 로컬 상태에서 해당 트랙 제거
        setLocalTracks((prev) =>
          prev.filter((t) => t.trackId !== track.trackId)
        );
        setPopupVisibleIndex(null);
      } else {
        console.error("삭제 실패:", res.data.message);
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  return (
    <div>
      {localTracks.map((track, index) => {
        const isExpanded = expandedIndexes.includes(index);
        const isLiked = likedIndexes.includes(index) || track.isLiked;
        const dateString = track.createdAt?.split("T")[0] || "";

        return (
          <div key={track.trackId || index}>
            {/* 메인 트랙 정보 영역 */}
            <TrackRow onClick={() => toggleExpansion(index)}>
              <TrackInfo>
                <AlbumCover />
                <TrackDetails>
                  <TrackTitle>{track.musicTitle}</TrackTitle>
                  <TrackDate>{dateString}</TrackDate>
                </TrackDetails>
              </TrackInfo>

              <TrackContent>
                <LikeButtonWrapper>
                  <LikeButton onClick={(e) => togglePopup(index, e)}>
                    <img
                      src={isLiked ? likeButtonOn : likeButtonOff}
                      alt="좋아요 버튼"
                    />
                  </LikeButton>

                  {/* 팝업 */}
                  {popupVisibleIndex === index && (
                    <Popup>
                      <PopupArrow />
                      <PopupContent>
                            <Link to="/harmony">
                             <PopupItem>화성 분석</PopupItem>
                             </Link>
                        {isLiked ? (
                          <PopupItem onClick={() => toggleLike(index)}>
                            즐겨찾기 취소
                          </PopupItem>
                        ) : (
                          <PopupItem onClick={() => toggleLike(index)}>
                            즐겨찾기
                          </PopupItem>
                        )}

                        {/* 삭제하기 */}
                        <PopupItem onClick={(e) => handleDeleteTrack(e, track)}>
                          삭제하기
                        </PopupItem>
                      </PopupContent>
                    </Popup>
                  )}
                </LikeButtonWrapper>
              </TrackContent>
            </TrackRow>

            {/* 확장된 세션 영역 */}
            {isExpanded && (
              <ExpandedSession>
                {/* 보컬 파트 */}
                <SessionBlock label="보컬" url={track.vocalUrl} />
                {/* MR (instrumentalUrl) */}
                <SessionBlock label="MR" url={track.instrumentalUrl} />
                {/* 베이스 (bassUrl) */}
                <SessionBlock label="베이스" url={track.bassUrl} />
                {/* 드럼 (drumsUrl) */}
                <SessionBlock label="드럼" url={track.drumsUrl} />
              </ExpandedSession>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sessioncon;

/* -----------------------------
   세션 블록 (재생/다운로드 + 슬라이더)
----------------------------- */
function SessionBlock({ label, url }) {
  // 재생 관련 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Hook은 항상 호출
  useEffect(() => {
    if (!url || url === "string") {
      return;
    }
    audioRef.current = new Audio(url);
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [url]);

  if (!url || url === "string") {
    return null;
  }

  // 다운로드
  const handleDownload = (e) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  // 재생/일시정지
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 슬라이더
  const handleSliderChange = (e) => {
    if (!audioRef.current) return;
    const newValue = Number(e.target.value);
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  // 시간 포맷
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <SessionRow onClick={(e) => e.stopPropagation()}>
      <SessionLeft>
        <CategorySquare>
          <CategoryText>{label}</CategoryText>
        </CategorySquare>
        <PlayBtn onClick={handlePlayPause}>
          <PlayBtnImg src={Playbutton} alt="재생 버튼" />
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

      <DownloadBtn onClick={handleDownload}>
        <DownloadBtnImg src={Downloadbut} alt="다운로드 버튼" />
      </DownloadBtn>
    </SessionRow>
  );
}

/* ------------------ styled-components ------------------ */
const TrackRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
  height: 120px;
  cursor: pointer;
  overflow: visible;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 3;
  transform: translateX(30px);
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

const TrackContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const LikeButtonWrapper = styled.div`
  position: relative;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transform: translateX(-30px);
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
  width: 0;
  height: 0;
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

const ExpandedSession = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

const SessionRow = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
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
