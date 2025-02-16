// sessionconSE.jsx
import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Playbutton from "../../assets/Mypg_img/Playbutton.svg";
import Downloadbut from "../../assets/Mypg_img/Downloadbut.svg";

/**
 * trackList: [
 *   {
 *     trackId: 0,
 *     musicId: 0,
 *     musicTitle: "string",
 *     createdAt: "...",
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
  // 세션 확장, 팝업, 좋아요 관리를 위해
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [popupVisibleIndex, setPopupVisibleIndex] = useState(null);
  const [likedIndexes, setLikedIndexes] = useState([]);

  // 확장 토글
  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  // 팝업 토글
  const togglePopup = (index, e) => {
    e.stopPropagation(); // 확장 클릭 충돌 방지
    if (popupVisibleIndex === index) {
      setPopupVisibleIndex(null);
    } else {
      setPopupVisibleIndex(index);
    }
  };

  // 좋아요 토글
  const toggleLike = (index) => {
    if (likedIndexes.includes(index)) {
      setLikedIndexes(likedIndexes.filter((i) => i !== index));
    } else {
      setLikedIndexes([...likedIndexes, index]);
    }
    setPopupVisibleIndex(null);
  };

  return (
    <div>
      {trackList.map((track, index) => {
        const isExpanded = expandedIndexes.includes(index);
        const isLiked = likedIndexes.includes(index) || track.isLiked;
        const dateString = track.createdAt?.split("T")[0] || "";

        // 세션(트랙) 필드 전부 사용
        // vocalUrl, instrumentalUrl, bassUrl, drumsUrl 등 표시
        // 확장 시 세션별 로직

        return (
          <div key={track.trackId || index}>
            {/* 메인 트랙 */}
            <TrackRow onClick={() => toggleExpansion(index)}>
              <LeftBadge>세션분리</LeftBadge>

              <TrackInfo>
                <AlbumCover />
                <TrackDetails>
                  <TrackTitle>{track.musicTitle}</TrackTitle>
                  <TrackDate>{dateString}</TrackDate>
                  <TrackExtra>{`trackId: ${track.trackId}, musicId: ${track.musicId}`}</TrackExtra>
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

                  {popupVisibleIndex === index && (
                    <Popup>
                      <PopupArrow />
                      <PopupContent>
                        <PopupItem>세션 전체 다운로드</PopupItem>
                        <PopupItem>화성 분석</PopupItem>
                        {isLiked ? (
                          <PopupItem onClick={() => toggleLike(index)}>
                            즐겨찾기 취소
                          </PopupItem>
                        ) : (
                          <PopupItem onClick={() => toggleLike(index)}>
                            즐겨찾기
                          </PopupItem>
                        )}
                        <PopupItem>삭제하기</PopupItem>
                      </PopupContent>
                    </Popup>
                  )}
                </LikeButtonWrapper>
              </TrackContent>
            </TrackRow>

            {/* 확장 영역 */}
            {isExpanded && (
              <ExpandedSession>
                {/* vocalUrl, instrumentalUrl, bassUrl, drumsUrl 존재할 때 각각 표시 */}
                <SessionBlock label="보컬" url={track.vocalUrl} />
                <SessionBlock label="MR" url={track.instrumentalUrl} />
                <SessionBlock label="베이스" url={track.bassUrl} />
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

/* 세션 블록: label, url */
function SessionBlock({ label, url }) {
  if (!url || url === "string") {
    return null; // url이 없으면 표시 안 함
  }
  return (
    <SessionRow>
      <SessionLeft>
        <CategorySquare>
          <CategoryText>{label}</CategoryText>
        </CategorySquare>
        <PlayBtn>
          <PlayBtnImg src={Playbutton} alt="재생 버튼" />
        </PlayBtn>
      </SessionLeft>
      <SliderContainer>
        <SessionSlider min="0" max="100" defaultValue="0" />
        <SessionTime>00:00</SessionTime>
      </SliderContainer>
      <DownloadBtn>
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
  background-color: #f9f8fa;
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  overflow: visible;
`;

const LeftBadge = styled.div`
  background-color: #8498f1;
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

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 3;
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

const TrackExtra = styled.div`
  font-size: 11px;
  color: #999;
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
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  border: 1px solid #ddd;
`;

const SessionRow = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
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

