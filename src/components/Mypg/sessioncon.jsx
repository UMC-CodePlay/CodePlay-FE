// sessioncon.jsx
import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import Playbutton from "../../assets/Mypg_img/Playbutton.svg";
import Downloadbut from "../../assets/Mypg_img/Downloadbut.svg";

// --- props로 tracks를 받도록 수정 ---
const Sessioncon = ({ tracks = [] }) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [popupVisibleIndex, setPopupVisibleIndex] = useState(null);
  const [likedIndexes, setLikedIndexes] = useState([]);

  // 확장/팝업/좋아요 토글 함수
  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  const togglePopup = (index) => {
    if (popupVisibleIndex === index) {
      setPopupVisibleIndex(null);
    } else {
      setPopupVisibleIndex(index);
    }
  };

  const toggleLike = (index) => {
    if (likedIndexes.includes(index)) {
      setLikedIndexes(likedIndexes.filter((i) => i !== index));
    } else {
      setLikedIndexes([...likedIndexes, index]);
    }
    setPopupVisibleIndex(null);
  };

  // 1) tracks가 비어 있다면 안내문 표시
  if (tracks.length === 0) {
    return <div style={{ margin: "20px 0", textAlign: "center" }}>음원이 없습니다.</div>;
  }

  // 2) tracks가 있다면 map으로 렌더링
  return (
    <div>
      {tracks.map((track, index) => (
        <div key={track.trackId}>
          {/* 메인 트랙 영역 */}
          <TrackRow>
            {/* 확장 toggle */}
            <TrackInfo onClick={() => toggleExpansion(index)}>
              <AlbumCover />
              <TrackDetails>
                {/* API 응답 예: musicTitle, createdAt */}
                <TrackTitle>{track.musicTitle}</TrackTitle>
                <TrackDate>{track.createdAt.split("T")[0]}</TrackDate>
              </TrackDetails>
            </TrackInfo>

            {/* 즐겨찾기 버튼 */}
            <TrackContent>
              <LikeButtonWrapper>
                <LikeButton onClick={(e) => {
                  e.stopPropagation(); // 부모 클릭(TrackInfo)와 구분
                  togglePopup(index);
                }}>
                  <img
                    src={
                      likedIndexes.includes(index)
                        ? likeButtonOn
                        : likeButtonOff
                    }
                    alt="좋아요 버튼"
                  />
                </LikeButton>

                {/* 팝업 메뉴 */}
                {popupVisibleIndex === index && (
                  <Popup>
                    <PopupArrow />
                    <PopupContent>
                      <PopupItem>세션 전체 다운로드</PopupItem>
                      <PopupItem>화성 분석</PopupItem>
                      {likedIndexes.includes(index) ? (
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

          {/* 확장된 세션 영역 (vocalUrl, instrumentalUrl, bassUrl, drumsUrl 등) */}
          {expandedIndexes.includes(index) && (
            <ExpandedSession>
              {["vocalUrl", "instrumentalUrl", "bassUrl", "drumsUrl"].map((category, idx) => (
                <SessionRow key={idx}>
                  <SessionLeft>
                    <CategorySquare>
                      <CategoryText>{category}</CategoryText>
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
              ))}
            </ExpandedSession>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sessioncon;

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
