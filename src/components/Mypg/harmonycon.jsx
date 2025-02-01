import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";

const Harmonybar=()=>{
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태

  const togglePopup = () => {
    setShowPopup(!showPopup); // 팝업 열기/닫기 토글
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked); // 좋아요 상태 변경
    setShowPopup(false); // 팝업 닫기
  };

  const trackData = [
    {
      title: "음원 제목입니다",
      date: "25.01.25",
      key: "C Major",
      spressure: "140",
      bpm: "80",
    },
  ];


  return(
           <div> 
          {/* 리스트 항목 */}
          <TrackRow>
            <TrackInfo>
              <AlbumCover />
              <TrackDetails>
                <TrackTitle>{trackData[0].title}</TrackTitle>
                <TrackDate>{trackData[0].date}</TrackDate>
              </TrackDetails>
            </TrackInfo>
            <TrackContent>
              <TrackCell>{trackData[0].key}</TrackCell>
              <TrackCell>{trackData[0].bpm}</TrackCell>
              <TrackCell>{trackData[0].spressure}</TrackCell>
              <LikeButtonWrapper>
                <LikeButton onClick={togglePopup}>
                  <img src={isLiked ? likeButtonOn : likeButtonOff} alt="좋아요 버튼" />
                </LikeButton>
                {showPopup && (
                  <Popup>
                    <PopupArrow />
                    <PopupContent>
                      <PopupItem>세션분리</PopupItem>
                      {isLiked ? (
                        <PopupItem onClick={handleLikeToggle}>즐겨찾기 취소</PopupItem>
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
          </div> 

  )



}

const Container = styled.div`
  width: 58%;
  margin: 0 auto;
  padding-top: 20px;
`;


const TrackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 15px 20px;
  margin-top: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
`;

const TrackInfo = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TrackContent = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  transform: translateX(-70px);
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
  flex: 1;
  text-align: center;
  img {
    width: 40px;
    height: 40px;
  }
transform: translate(47px, -10px);

`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 90px; /* 하트 오른쪽으로 50px 이동 */
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
  left: -8px; /* 팝업 화살표를 왼쪽에 배치 */
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent; /* 투명한 위쪽 */
  border-bottom: 8px solid transparent; /* 투명한 아래쪽 */
  border-right: 8px solid #fff; /* 화살표 색상 */
  
`;


const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
  text-align: center; /* 텍스트를 가운데 정렬 */



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

export default Harmonybar;