import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slider";
import PlayBtn from "../assets/PlayBtn.svg";
import PauseBtn from "../assets/PauseBtn.svg";

const OneAudioPlayer = ({ audioUrl }) => {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(audioRef.current.currentTime);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const handleSeek = (value) => {
    setProgress(value);
    audioRef.current.currentTime = value;
  };

  return (
    <PlayerWrapper>
      <audio ref={audioRef} src={audioUrl} />
      <PlayButton
        onClick={() => {
          if (playing) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setPlaying(!playing);
        }}
      >
        {playing ? (
          <img src={PauseBtn} alt="Pause" />
        ) : (
          <img src={PlayBtn} alt="Play" />
        )}
      </PlayButton>
      <StyledSlider
        value={progress}
        onChange={handleSeek} // ✅ 마우스로 조작 가능
        max={duration}
        min={0}
      />
      <TimeDisplay>
        {formatTime(progress)} / {formatTime(duration)}
      </TimeDisplay>
      <DownloadButton onClick={() => window.open(audioUrl)}>
        다운로드
      </DownloadButton>
    </PlayerWrapper>
  );
};

// 시간을 mm:ss 형식으로 변환하는 함수
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

// 스타일
const PlayerWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center; /* ✅ 중앙 정렬 */
  gap: 20px;
  margin-top: 20px; /* 상단 여백 */
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledSlider = styled(Slider)`
  width: 400px;
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
  font-size: 17px;
  color: white;
`;

const DownloadButton = styled.button`
  width: 100px;
  height: 40px;
  background: none;
  border: 2px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export default OneAudioPlayer;
