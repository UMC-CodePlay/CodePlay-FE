import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slider";
import PlayBtn from "../assets/PlayBtn.svg";
import PauseBtn from "../assets/PauseBtn.svg";
import MRmark from "../assets/MRmark.svg";
import Vocalmark from "../assets/Vocalmark.svg";
import Bassmark from "../assets/Bassmark.svg";
import Drummark from "../assets/Drummark.svg";

export default function CustomMusicPlayer() {
  const [progressMR, setProgressMR] = useState(0);
  const [playingMR, setPlayingMR] = useState(false);
  const duration = 204; // API받아와서 해당 음악에 해당하는 길이 만큼 설정하도록 하면 됨.
  const intervalRef = useRef(null);
  const [playingVocal, setPlayingVocal] = useState(false);
  const [progressVocal, setProgressVocal] = useState(0);
  const [playingBass, setPlayingBass] = useState(false);
  const [progressBass, setProgressBass] = useState(0);
  const [playingDrum, setPlayingDrum] = useState(false);
  const [progressDrum, setProgressDrum] = useState(0);

  // MR 상태관리
  useEffect(() => {
    if (playingMR) {
      intervalRef.current = setInterval(() => {
        setProgressMR((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playingMR, duration]);

  //보컬 상태관리
  useEffect(() => {
    if (playingVocal) {
      intervalRef.current = setInterval(() => {
        setProgressVocal((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playingVocal, duration]);

  //베이스 상태관리
  useEffect(() => {
    if (playingBass) {
      intervalRef.current = setInterval(() => {
        setProgressBass((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playingBass, duration]);

  //드럼 상태관리
  useEffect(() => {
    if (playingDrum) {
      intervalRef.current = setInterval(() => {
        setProgressDrum((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playingDrum, duration]);
  return (
    <Wrapper>
      {/** MR 상태관리 */}
      <TContainer>
        <img src={MRmark} style={{ borderRadius: "7px 0px 0px 7px" }}></img>
        <Container>
          <Player>
            <PlayButton onClick={() => setPlayingMR(!playingMR)}>
              {playingMR ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressMR}
              onChange={setProgressMR}
              max={duration}
              min={0}
            />
            <TimeDisplay>
              {formatTime(progressMR)} / {formatTime(duration)}
            </TimeDisplay>
          </Player>

          <DownloadButton>다운로드</DownloadButton>
        </Container>
      </TContainer>

      {/** 보컬 상태관리 */}
      <TContainer>
        <img src={Vocalmark} style={{ borderRadius: "7px 0px 0px 7px" }}></img>
        <Container>
          <Player>
            <PlayButton onClick={() => setPlayingVocal(!playingVocal)}>
              {playingVocal ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressVocal}
              onChange={setProgressVocal}
              max={duration}
              min={0}
            />
            <TimeDisplay>
              {formatTime(progressVocal)} / {formatTime(duration)}
            </TimeDisplay>
          </Player>
          <DownloadButton>다운로드</DownloadButton>
        </Container>
      </TContainer>

      {/** 보컬 상태관리 */}
      <TContainer>
        <img src={Bassmark} style={{ borderRadius: "7px 0px 0px 7px" }}></img>
        <Container>
          <Player>
            <PlayButton onClick={() => setPlayingBass(!playingBass)}>
              {playingBass ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressBass}
              onChange={setProgressBass}
              max={duration}
              min={0}
            />
            <TimeDisplay>
              {formatTime(progressBass)} / {formatTime(duration)}
            </TimeDisplay>
          </Player>
          <DownloadButton>다운로드</DownloadButton>
        </Container>
      </TContainer>

      <TContainer>
        <img src={Drummark} style={{ borderRadius: "7px 0px 0px 7px" }}></img>
        <Container>
          <Player>
            <PlayButton onClick={() => setPlayingDrum(!playingDrum)}>
              {playingDrum ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressDrum}
              onChange={setProgressDrum}
              max={duration}
              min={0}
            />
            <TimeDisplay>
              {formatTime(progressDrum)} / {formatTime(duration)}
            </TimeDisplay>
          </Player>
          <DownloadButton>다운로드</DownloadButton>
        </Container>
      </TContainer>
    </Wrapper>
  );
}

// 시간을 mm:ss 포맷으로 변환
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const Wrapper = styled.div`
  align-items: center;
  flex-shrink: 0;
  border-radius: 36px;
  background: #17171e;
  justify-items: center;
  width: 1000px;
  height: 500px;
  display: grid;
  grid-template-rows: auto auto auto auto;
  padding: 20px;
  gap: 20px;
  margin: 20px 0px 0px 20px;
`;
const TContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 80px;
  width: 800px;
`;
// 전체 컨테이너
const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: #1a1a1e;
  padding: 10px;
  border-radius: 0px 7px 7px 0px;
  gap: 3px;
  &.last-chlid {
    gird-column-end: -1;
  }
`;

// 중앙 플레이어
const Player = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

// 커스텀 슬라이더
const StyledSlider = styled(Slider)`
  width: 70%;
  height: 6px;
  border-radius: 5px;
  cursor: pointer;

  /* 전체 배경 (기본 트랙) */
  & .track {
    height: 6px;
    border-radius: 5px;
  }

  /* 진행된 부분 (앞부분 채워짐) */
  & .track-0 {
    background: linear-gradient(90deg, #8b5cf6, #6d28d9); /* 보라색 */
  }

  /* 남은 부분 (빈 공간) */
  & .track-1 {
    background: #ffffff; /* 흰색 */
  }

  /* 슬라이더 버튼 (움직이는 손잡이) */
  & .thumb {
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

// 시간 표시
const TimeDisplay = styled.div`
  font-size: 12px;
  color: white;
`;

// 다운로드 버튼
const DownloadButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  width: 80px;
  cursor: pointer;
  justify-self: end;
`;
