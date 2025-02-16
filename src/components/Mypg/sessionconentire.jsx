// sessionconentire.jsx
import React, { useState } from "react";
import styled from "styled-components";
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
 */
const Sessioncon = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLiked, setIsLiked] = useState(data.isLiked || false);

  const dateString = data.createdAt?.split("T")[0] || "";

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(!showPopup);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setShowPopup(false);
  };

  // 세션 목록: { 이름, url } 형태로 구성
  const sessions = [
    { label: "보컬", url: data.vocalUrl },
    { label: "MR", url: data.instrumentalUrl },
    { label: "베이스", url: data.bassUrl },
    { label: "드럼", url: data.drumsUrl },
  ];

  // 실제로 url이 있을 때만 표시
  const validSessions = sessions.filter((s) => s.url && s.url !== "string");

  return (
    <div>
      <TrackRow onClick={toggleExpansion}>
        {/* 왼쪽 파란 배지 */}
        <BlueBadge>세션분리</BlueBadge>

        <TrackInfo>
          <AlbumCover />
          <TrackDetails>
            <TrackTitle>{data.musicTitle}</TrackTitle>
            <TrackDate>{dateString}</TrackDate>
            <ExtraInfo>musicId: {data.musicId}</ExtraInfo>
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
                  <PopupItem>세션 전체 다운로드</PopupItem>
                  <PopupItem>화성 분석</PopupItem>
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

      {/* 확장된 세션 (토글) */}
      {expanded && (
        <ExpandedSession>
          {validSessions.length === 0 ? (
            <NoSessions>세션 URL이 없습니다.</NoSessions>
          ) : (
            validSessions.map((sessionItem, idx) => (
              <SessionRow key={idx}>
                <SessionLeft>
                  <CategorySquare>
                    <CategoryText>{sessionItem.label}</CategoryText>
                  </CategorySquare>
                  <PlayBtn>
                    {/* 재생 로직 or audio 태그 */}
                    <PlayBtnImg src={Playbutton} alt="재생 버튼" />
                  </PlayBtn>
                </SessionLeft>

                {/* 슬라이더와 재생 시간 예시 */}
                <SliderContainer>
                  <SessionSlider min="0" max="100" defaultValue="0" />
                  <SessionTime>00:00</SessionTime>
                </SliderContainer>

                {/* 다운로드 버튼 */}
                <DownloadBtn>
                  <DownloadBtnImg src={Downloadbut} alt="다운로드 버튼" />
                </DownloadBtn>
              </SessionRow>
            ))
          )}
        </ExpandedSession>
      )}
    </div>
  );
};

export default Sessioncon;

/* ------------------ styled-components ------------------ */

// 왼쪽 파란 배지
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

// 좋아요 버튼 & 팝업
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

// 확장된 세션 영역
const ExpandedSession = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

const SessionRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SessionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 120px;
`;

/* 회색 박스 */
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

/* 재생 버튼 */
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

/* 슬라이더와 시간 컨테이너 */
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

/* 다운로드 버튼 */
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

const NoSessions = styled.div`
  padding: 20px;
  color: #999;
  text-align: center;
`;

