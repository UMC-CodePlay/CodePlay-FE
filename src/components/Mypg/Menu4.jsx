import React, { useState } from "react";
import styled from "styled-components";
import playButton from "../../assets/Mypg_img/play_button.svg";
import stopButton from "../../assets/Mypg_img/stop_button.svg";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";

const Menu2 = () => {
  const [activeButton, setActiveButton] = useState("전체");
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const buttons = ["화성 분석", "세션 분리"];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const trackData = {
    title: "파일1",
    category: "드럼",
    date: "작업 일시",
  };

  return (
    <Container>
      {/* 버튼 섹션 */}
      <ButtonContainer>
        {buttons.map((button) => (
          <StyledButton
            key={button}
            isActive={activeButton === button}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </StyledButton>
        ))}
      </ButtonContainer>

      {/* 리스트 섹션 */}
      <TrackContainer>
        {/* 이미지 공간 */}
        <AlbumCover />

        {/* 텍스트 정보 */}
        <TrackInfo>
          <TrackTitle>{trackData.title}</TrackTitle>
          <TrackCategory>{trackData.category}</TrackCategory>
          <TrackDate>{trackData.date}</TrackDate>
        </TrackInfo>

        {/* 재생 버튼과 슬라이더 */}
        <PlayerContainer>
          <PlayerBox>
            <PlayButton onClick={togglePlay}>
              <img
                src={isPlaying ? stopButton : playButton}
                alt={isPlaying ? "정지" : "재생"}
              />
            </PlayButton>
            <Slider
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              onChange={(e) => {
                const value = e.target.value;
                e.target.style.background = `linear-gradient(to right, #6F3DA1 ${value}%, #E4E1E7 ${value}%)`;
              }}
            />
          </PlayerBox>
        </PlayerContainer>

        {/* 좋아요 버튼 */}
        <LikeButton onClick={toggleLike}>
          <img
            src={isLiked ? likeButtonOn : likeButtonOff}
            alt="좋아요 버튼"
          />
        </LikeButton>
      </TrackContainer>
    </Container>
  );
};

export default Menu2;

// Styled-components
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  border: 2px solid ${({ isActive }) => (isActive ? "#6F3DA1" : "#C9C3CE")};
  border-radius: 9999px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? "#000000" : "#C9C3CE")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TrackContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlbumCover = styled.div`
  width: 80px;
  height: 80px;
  background-color: #d3d3d3;
  border-radius: 10px;
  margin-right: 20px;
`;

const TrackInfo = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const TrackTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const TrackCategory = styled.div`
  font-size: 14px;
  color: #6f3da1;
  margin-bottom: 5px;
`;

const TrackDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const PlayerContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const PlayButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Slider = styled.input`
  flex: 1;
  appearance: none;
  height: 5px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  accent-color: #6f3da1;
  background: linear-gradient(to right, #6f3da1 50%, #e4e1e7 50%);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  &:hover {
    opacity: 0.9;
  }
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 20px;

  img {
    width: 20px;
    height: 20px;
  }
`;
