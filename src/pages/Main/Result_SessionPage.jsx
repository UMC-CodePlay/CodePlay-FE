import styled from "styled-components";
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import OneAudioPlayer from "../../components/OneAudioPlayer";
import { Link } from "react-router-dom";
import BlueButton from "../../components/Buttons/BlueButton";
import PrevBlueButton from "../../components/Buttons/PrevBlueButton";
import BackGroundResult from "../../components/BackGroundResult";
import { useState, useEffect } from "react";
import axios from "axios";
import MRmark from "../../assets/MRmark.svg";
import Vocalmark from "../../assets/Vocalmark.svg";
import Bassmark from "../../assets/Bassmark.svg";
import Drummark from "../../assets/Drummark.svg";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Result_SessionPage = () => {

  const [sessionInfo, setSessionInfo] = useState({
    musicTitle: "세션 분리 결과",
    vocalUrl: "",
    instrumentalUrl: "",
    bassUrl: "",
    drumsUrl: "",
  });

  useEffect(() => {
    getRequestSession();
  }, []);

  const getRequestSession = async () => {
    const token = localStorage.getItem("token");
    const taskId = localStorage.getItem("taskId");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/task/search?taskId=${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const session = response.data.result.tracks[0];

      setSessionInfo({
        musicTitle: session.musicTitle,
        vocalUrl: session.vocalUrl,
        instrumentalUrl: session.instrumentalUrl,
        bassUrl: session.bassUrl,
        drumsUrl: session.drumsUrl,
      });

      console.log("응답 데이터:", response.data);
      console.log("응답 session:", session);
    } catch (error) {
      console.error("getRequestSession Error", error);
    }
  };

  return (
    <>
      <ConditionalNavbar />
      <TitleNavbar title={`${sessionInfo.musicTitle}의 세션 분리 결과`} />
      <Wrapper>
        <BackGroundResult />

        <AudioContainer>
          <Track>
            <TrackIcon src={MRmark} alt="Instrumental" />
            {sessionInfo.instrumentalUrl && (
              <StyledOneAudioPlay audioUrl={sessionInfo.instrumentalUrl} />
            )}
          </Track>

          <Track>
            <TrackIcon src={Vocalmark} alt="Vocal" />
            {sessionInfo.vocalUrl && (
              <StyledOneAudioPlay audioUrl={sessionInfo.vocalUrl} />
            )}
          </Track>

          <Track>
            <TrackIcon src={Bassmark} alt="Bass" />
            {sessionInfo.bassUrl && (
              <StyledOneAudioPlay audioUrl={sessionInfo.bassUrl} />
            )}
          </Track>

          <Track>
            <TrackIcon src={Drummark} alt="Drums" />
            {sessionInfo.drumsUrl && (
              <StyledOneAudioPlay audioUrl={sessionInfo.drumsUrl} />
            )}
          </Track>
        </AudioContainer>

        <ButtonContainer>
          <PrevBlueButton>
            <Link to="/session">이전으로</Link>
          </PrevBlueButton>
          <BlueButton>
            <Link to="/">전체 다운로드</Link>
          </BlueButton>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

export default Result_SessionPage;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: 80px;
  gap: 30px;
`;

const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 900px;
  background: #222;
  padding: 20px;
  border-radius: 12px;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  height: 120px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const TrackIcon = styled.img`
  width: 160px;
  height: 120px;
  margin-right: 20px;
`;

const StyledOneAudioPlay = styled(OneAudioPlayer)`
  flex: 1;
  max-width: 800px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 70px;
  margin-top: 20px;
`;
