import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import ResultContentContainer from "../../components/Container/ResultContentContainer";
import ControlPanel from "../../components/Controls/ControlPanel";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Result_RemixingPage = () => {
  const [activeTab, setActiveTab] = useState("스케일");

  // 스케일: -12 ~ +12
  const [scale, setScale] = useState(0);
  // 템포: 0.1 ~ (이상)
  const [tempo, setTempo] = useState(1.0);
  // 리버브: 0.0 ~ 0.3 (기존 boolean -> number 형태로 변경)
  const [reverb, setReverb] = useState(0.0);
  // 코러스: boolean
  const [chorus, setChorus] = useState(false);

  const handleScaleChange = (direction) => {
    if (direction === "up" && scale < 12) {
      setScale((prev) => prev + 1);
    } else if (direction === "down" && scale > -12) {
      setScale((prev) => prev - 1);
    }
  };

  const handleTempoChange = (direction) => {
    if (direction === "up") {
      setTempo((prev) => Number((prev + 0.1).toFixed(1)));
    } else if (direction === "down" && tempo > 0.1) {
      setTempo((prev) => Number((prev - 0.1).toFixed(1)));
    }
  };

  // 리버브도 스케일과 유사하게 0 ~ 0.3 범위 내에서 0.1씩 증감
  const handleReverbChange = (direction) => {
    if (direction === "up" && reverb < 0.3) {
      setReverb((prev) => Number((prev + 0.1).toFixed(1)));
    } else if (direction === "down" && reverb > 0.0) {
      setReverb((prev) => Number((prev - 0.1).toFixed(1)));
    }
  };

  // 토글 함수에서 리버브 관련 부분은 주석 처리
  const handleToggle = (feature) => {
    // if (feature === "reverb") {
    //   setReverb(!reverb);
    // } else
    if (feature === "chorus") {
      setChorus(!chorus);
    }
  };

  const requestRemixing = async () => {
    try {
      const token = localStorage.getItem("token");
      const musicId = localStorage.getItem("musicId");
      const requestData = {
        musicId: musicId,
        parentRemixId: 0,
        scaleModulation: scale,
        tempoRatio: tempo,
        // 변경된 reverbAmount: boolean이 아닌 숫자를 그대로 전송
        reverbAmount: reverb,
        isChorusOn: chorus,
      };

      console.log("🎶 Remixing 요청 데이터:", requestData);

      const response = await axios.post(
        `${API_BASE_URL}/task/remix`,
        {
          musicId: musicId,
          scaleModulation: scale,
          tempoRatio: tempo,
          reverbAmount: reverb, // 숫자 그대로
          isChorusOn: chorus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("🎶 Remixing 요청 성공:", response.data);
        alert("Remixing 작업이 성공적으로 완료되었습니다!");
      } else {
        console.warn("⚠️ Remixing 요청 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("❌ Remixing 요청 오류:", error.message);
    }
  };

  return (
    <ResultContentContainer title="리믹싱 결과" prevLink="/remixing">
      <ControlSection>
        <TabContainer>
          <Tab active={activeTab === "스케일"} onClick={() => setActiveTab("스케일")}>
            스케일
          </Tab>
          <Tab active={activeTab === "템포"} onClick={() => setActiveTab("템포")}>
            템포
          </Tab>
          <Tab active={activeTab === "리버브"} onClick={() => setActiveTab("리버브")}>
            리버브
          </Tab>
          <Tab active={activeTab === "코러스"} onClick={() => setActiveTab("코러스")}>
            코러스
          </Tab>
        </TabContainer>
        <ControlPanel
          activeTab={activeTab}
          scale={scale}
          tempo={tempo}
          reverb={reverb}
          chorus={chorus}
          handleScaleChange={handleScaleChange}
          handleTempoChange={handleTempoChange}
          handleReverbChange={handleReverbChange} // 새로 만든 함수
          handleToggle={handleToggle}
          setScale={setScale}
          setTempo={setTempo}
          requestRemixing={requestRemixing}
        />
      </ControlSection>
    </ResultContentContainer>
  );
};

const ControlSection = styled.div`
  width: 1090px;
  height: 500px;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px;
  border: none;
  background: ${(props) => (props.active ? "#24B2E7" : "transparent")};
  color: white;
  cursor: pointer;
`;

export default Result_RemixingPage;
