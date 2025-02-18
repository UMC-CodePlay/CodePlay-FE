// src/components/CustomMusicPlayer.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slider";
import PlayBtn from "../assets/PlayBtn.svg";
import PauseBtn from "../assets/PauseBtn.svg";

export default function CustomMusicPlayer() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const duration = 204; // 예시: 음악 길이 (초)
  const intervalRef = useRef(null);

  // 재생 상태 관리: play 상태에 따라 1초마다 progress 증가
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, duration]);

  return (
    <PlayerWrapper>
      <PlayButton onClick={() => setPlaying(!playing)}>
        {playing ? (
          <img src={PauseBtn} alt="Pause" />
        ) : (
          <img src={PlayBtn} alt="Play" />
        )}
      </PlayButton>
      <StyledSlider
        value={progress}
        onChange={setProgress}
        max={duration}
        min={0}
      />
      <TimeDisplay>
        {formatTime(progress)} / {formatTime(duration)}
      </TimeDisplay>
      <DownloadButton>다운로드</DownloadButton>
    </PlayerWrapper>
  );
}

// 시간을 mm:ss 형식으로 변환하는 함수
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

// 플레이어 요소들을 한 줄로 배치하는 단일 컨테이너만 사용
const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* 필요한 경우 여백이나 너비를 추가로 설정하세요 */
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledSlider = styled(Slider)`
  width: 200px;
  height: 6px;
  border-radius: 5px;
  cursor: pointer;

  & .track {
    height: 6px;
    border-radius: 5px;
  }

  & .track-0 {
    background: linear-gradient(90deg, #8b5cf6, #6d28d9);
  }

  & .track-1 {
    background: #ffffff;
  }

  & .thumb {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

const TimeDisplay = styled.div`
  font-size: 12px;
  color: white;
`;

const DownloadButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
