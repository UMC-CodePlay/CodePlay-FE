// src/components/Mypg/sessionconentire.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Playbutton from "../../assets/Mypg_img/Playbutton.svg";
import Downloadbut from "../../assets/Mypg_img/Downloadbut.svg";

/**
 * data 예시:
 * {
 *   "trackId": 0,
 *   "musicId": 0,
 *   "musicTitle": "string",
 *   "createdAt": "2025-02-15T10:17:45.519Z",
 *   "vocalUrl": "string",
 *   "instrumentalUrl": "string",
 *   "bassUrl": "string",
 *   "drumsUrl": "string",
 *   "isLiked": true
 * }
 *
 * onAddFavorite(musicId, false)
 * onRemoveFavorite(musicId, false)
 */
const Sessioncon = ({ data, onAddFavorite, onRemoveFavorite }) => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const isLiked = data.isLiked || false;
  const dateString = data.createdAt?.split("T")[0] || "";

  // 클릭 시 확장/축소
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // 팝업
  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  // 즐겨찾기 버튼
  const handleLikeToggle = () => {
    if (isLiked) {
      onRemoveFavorite(data.musicId, false);
    } else {
      onAddFavorite(data.musicId, false);
    }
    setShowPopup(false);
  };

  // 세션 목록(보컬, MR, 베이스, 드럼)
  const sessions = [
    { label: "보컬", url: data.vocalUrl },
    { label: "MR", url: data.instrumentalUrl },
    { label: "베이스", url: data.bassUrl },
    { label: "드럼", url: data.drumsUrl },
  ].filter((s) => s.url && s.url !== "string"); // url이 "string"이거나 없으면 제외

  return (
    <div>
      {/* 메인 트랙 영역 */}
      <TrackRow onClick={toggleExpansion}>
        <BlueBadge>세션분리</BlueBadge>

        <TrackInfo>
          <AlbumCover />
          <TrackDetails>
            <TrackTitle>{data.musicTitle}</TrackTitle>
            <TrackDate>{dateString}</TrackDate>
          </TrackDetails>
        </TrackInfo>

        <TrackContent>
          <LikeButtonWrapper>
            <LikeButton onClick={togglePopup}>
              <img
                src={isLiked ? likeButtonOn : likeButtonOff}
                alt="좋아요 버튼"
              />
            </LikeButton>

            {/* 팝업 메뉴 */}
            {showPopup && (
              <Popup>
                <PopupArrow />
                <PopupContent>
                  <PopupItem>
                  <Link to="/harmony">
                    화성 분석
                  </Link>

                    </PopupItem>
                  {isLiked ? (
                    <PopupItem onClick={handleLikeToggle}>
                      즐겨찾기 취소
                    </PopupItem>
                  ) : (
                    <PopupItem onClick={handleLikeToggle}>즐겨찾기</PopupItem>
                  )}
                  <PopupItem>삭제하기</PopupItem>
                </PopupContent>
              </Popup>
            )}
          </LikeButtonWrapper>
        </TrackContent>
      </TrackRow>

      {/* 확장된 세션 영역 */}
      {expanded && (
        <ExpandedSession>
          {sessions.length === 0 ? (
            <NoSessions>세션 URL이 없습니다.</NoSessions>
          ) : (
            sessions.map((sessionItem, idx) => (
              // 세션별 오디오 재생/다운로드를 처리하는 컴포넌트
              <SessionAudioRow
                key={idx}
                label={sessionItem.label}
                url={sessionItem.url}
              />
            ))
          )}
        </ExpandedSession>
      )}
    </div>
  );
};

export default Sessioncon;

/* 
  -----------------------------
  하단: 각 세션(보컬/MR/베이스/드럼)을
  재생/슬라이더/다운로드로 다루는 컴포넌트
  -----------------------------
*/
function SessionAudioRow({ label, url }) {
  // 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 첫 렌더 시 오디오 생성 + 이벤트 등록
  React.useEffect(() => {
    if (!url) return;
    const audioObj = new Audio(url);

    const onLoadedMetadata = () => {
      setDuration(audioObj.duration);
    };
    const onTimeUpdate = () => {
      setCurrentTime(audioObj.currentTime);
    };

    audioObj.addEventListener("loadedmetadata", onLoadedMetadata);
    audioObj.addEventListener("timeupdate", onTimeUpdate);

    setAudio(audioObj);

    // cleanup
    return () => {
      audioObj.pause();
      audioObj.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioObj.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [url]);

  // Play/Pause 토글
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // 슬라이더 변경
  const handleSliderChange = (e) => {
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 다운로드
  const handleDownload = (e) => {
    e.stopPropagation();
    if (!url) {
      alert("다운로드 URL이 없습니다.");
      return;
    }
    window.open(url, "_blank");
  };

  // (초 단위 → mm:ss) 변환
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };

  if (!url) {
    return null;
  }

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
          min={0}
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

// 트랙 영역
const BlueBadge = styled.div`
  background-color: rgba(132, 152, 241, 1);
  color: #fff;
  font-size: 14px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  font-weight: bold;
  height: 70px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-right: 10px;
`;

const TrackRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  background-color: rgba(249, 248, 250, 1);
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  overflow: visible;

`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 3;
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

const ExtraInfo = styled.div`
  font-size: 11px;
  color: #999;
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

// 확장된 세션 영역
const ExpandedSession = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

const NoSessions = styled.div`
  padding: 20px;
  color: #999;
  text-align: center;
`;

/* -----------------------------
   개별 세션(보컬/MR/베이스/드럼) 재생/다운로드
----------------------------- */
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
