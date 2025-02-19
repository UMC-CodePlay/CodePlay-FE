// src/components/Mypg/harmonycon.jsx
import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import { Link } from "react-router-dom";


/**
 * track: {
 *   harmonyId, musicId, musicTitle, createdAt, scale, genre,
 *   bpm, voiceColor, isLiked, originalIndex
 * }
 * onToggleLike: (track) => void
 * onDelete: (track) => void  // ← 추가
 */
const Harmonybar = ({ track, onToggleLike, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const {
    harmonyId,
    musicId,
    musicTitle,
    createdAt,
    scale,
    bpm,
    genre,
    isLiked,
  } = track;

  const dateString = createdAt?.split("T")[0] || "";

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <TrackRow>
      {/* 음원 기본 정보 */}
      <TrackInfo>
        <AlbumCover />
        <TrackDetails>
          <TrackTitle>{musicTitle}</TrackTitle>
          <TrackDate>{dateString}</TrackDate>
        </TrackDetails>
      </TrackInfo>

      {/* 키 / BPM / etc. */}
      <TrackContent>
        <TrackCell>{scale}</TrackCell>
        <TrackCell>{bpm}</TrackCell>

        {/* 좋아요 버튼 팝업 */}
        <LikeButtonWrapper>
          <LikeButton onClick={togglePopup}>
            <img src={isLiked ? likeButtonOn : likeButtonOff} alt="하트 버튼" />
          </LikeButton>
          {showPopup && (
            <Popup>
              <PopupArrow />
              <PopupContent>
                <PopupItem>
                <Link to="/session">
                  세션분리
                </Link>
                  </PopupItem>
                {isLiked ? (
                  <PopupItem
                    onClick={() => {
                      // 즐겨찾기 취소
                      onToggleLike(track);
                      setShowPopup(false);
                    }}
                  >
                    즐겨찾기 취소
                  </PopupItem>
                ) : (
                  <PopupItem
                    onClick={() => {
                      // 즐겨찾기 추가
                      onToggleLike(track);
                      setShowPopup(false);
                    }}
                  >
                    즐겨찾기
                  </PopupItem>
                )}

                {/* ▼ 삭제하기 */}
                <PopupItem
                  onClick={() => {
                    onDelete(track);  // ← 클릭 시 부모에 삭제 요청
                    setShowPopup(false);
                  }}
                >
                  삭제하기
                </PopupItem>
              </PopupContent>
            </Popup>
          )}
        </LikeButtonWrapper>
      </TrackContent>
    </TrackRow>
  );
};

export default Harmonybar;

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
`;

const TrackInfo = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 15px;
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
  flex: 3;
  display: flex;
  justify-content: space-between;
  transform: translateX(-70px);
`;
const TrackCell = styled.span`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #000;
`;

const LikeButtonWrapper = styled.div`
  position: relative;
`;
const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  img {
    width: 40px;
    height: 40px;
  }
  transform: translate(47px, -10px);
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 90px;
  transform: translateY(-60%);
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
