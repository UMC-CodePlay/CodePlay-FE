import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slider";
import PlayBtn from "../assets/PlayBtn.svg";
import PauseBtn from "../assets/PauseBtn.svg";
import MRmark from "../assets/MRmark.svg";
import Vocalmark from "../assets/Vocalmark.svg";
import Bassmark from "../assets/Bassmark.svg";
import Drummark from "../assets/Drummark.svg";

const Audioplay = ({ vocalUrl, instrumentalUrl, bassUrl, drumsUrl }) => {
  const [duration, setDuration] = useState(0);

  const [progressMR, setProgressMR] = useState(0);
  const [playingMR, setPlayingMR] = useState(false);
  const [progressVocal, setProgressVocal] = useState(0);
  const [playingVocal, setPlayingVocal] = useState(false);
  const [progressBass, setProgressBass] = useState(0);
  const [playingBass, setPlayingBass] = useState(false);
  const [progressDrum, setProgressDrum] = useState(0);
  const [playingDrum, setPlayingDrum] = useState(false);

  const audioMRRef = useRef(new Audio(instrumentalUrl));
  const audioVocalRef = useRef(new Audio(vocalUrl));
  const audioBassRef = useRef(new Audio(bassUrl));
  const audioDrumRef = useRef(new Audio(drumsUrl));

  useEffect(() => {
    const setAudioDuration = (audioRef) => {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    };

    setAudioDuration(audioMRRef);
    setAudioDuration(audioVocalRef);
    setAudioDuration(audioBassRef);
    setAudioDuration(audioDrumRef);
  }, []);

  const togglePlay = (audioRef, setPlaying, playing) => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const updateProgress = (audioRef, setProgress) => {
    if (!audioRef.current) return;
    audioRef.current.ontimeupdate = () => {
      setProgress(audioRef.current.currentTime);
    };
  };

  const setAudioTime = (audioRef, time, setProgress) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  useEffect(() => {
    updateProgress(audioMRRef, setProgressMR);
    updateProgress(audioVocalRef, setProgressVocal);
    updateProgress(audioBassRef, setProgressBass);
    updateProgress(audioDrumRef, setProgressDrum);
  }, []);

  return (
    <Wrapper>
      {/* 🎵 MR 트랙 */}
      <TContainer>
        <img src={MRmark} style={{ borderRadius: "7px 0px 0px 7px" }} />
        <Container>
          <Player>
            <PlayButton
              onClick={() => togglePlay(audioMRRef, setPlayingMR, playingMR)}
            >
              {playingMR ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressMR}
              onChange={(value) =>
                setAudioTime(audioMRRef, value, setProgressMR)
              }
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

      {/* 🎵 보컬 트랙 */}
      <TContainer>
        <img src={Vocalmark} style={{ borderRadius: "7px 0px 0px 7px" }} />
        <Container>
          <Player>
            <PlayButton
              onClick={() =>
                togglePlay(audioVocalRef, setPlayingVocal, playingVocal)
              }
            >
              {playingVocal ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressVocal}
              onChange={(value) =>
                setAudioTime(audioVocalRef, value, setProgressVocal)
              }
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

      {/* 🎵 베이스 트랙 */}
      <TContainer>
        <img src={Bassmark} style={{ borderRadius: "7px 0px 0px 7px" }} />
        <Container>
          <Player>
            <PlayButton
              onClick={() =>
                togglePlay(audioBassRef, setPlayingBass, playingBass)
              }
            >
              {playingBass ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressBass}
              onChange={(value) =>
                setAudioTime(audioBassRef, value, setProgressBass)
              }
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

      {/* 🎵 드럼 트랙 */}
      <TContainer>
        <img src={Drummark} style={{ borderRadius: "7px 0px 0px 7px" }} />
        <Container>
          <Player>
            <PlayButton
              onClick={() =>
                togglePlay(audioDrumRef, setPlayingDrum, playingDrum)
              }
            >
              {playingDrum ? <img src={PauseBtn} /> : <img src={PlayBtn} />}
            </PlayButton>
            <StyledSlider
              value={progressDrum}
              onChange={(value) =>
                setAudioTime(audioDrumRef, value, setProgressDrum)
              }
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
};
export default Audioplay;

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
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
