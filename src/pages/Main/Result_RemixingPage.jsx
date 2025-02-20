import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import ResultContentContainer from "../../components/Container/ResultContentContainer.jsx";
import ControlPanel from "../../components/Controls/ControlPanel.jsx";
import OneAudioPlayer from "../../components/OneAudioPlayer.jsx";
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
  const [resultMusicUrl, setResultMusicUrl] = useState(null);

  const handleScaleChange = (direction) => {
    setScale((prev) =>
      direction === "up" && prev < 12
        ? prev + 1
        : direction === "down" && prev > -12
          ? prev - 1
          : prev,
    );
  };

  const handleTempoChange = (direction) => {
    setTempo((prev) => {
      if (direction === "up" && prev < 4.0) {
        return Number((prev + 0.1).toFixed(1)); //최대 4.0
      } else if (direction === "down" && prev > 0.1) {
        return Number((prev - 0.1).toFixed(1)); //최소 0.1
      }
      return prev;
    });
  };

  const handleToggle = (feature) => {
    if (feature === "reverb") {
      setReverb((prev) => !prev);
    } else if (feature === "chorus") {
      setChorus((prev) => !prev);
    }
  };

  const requestRemixing = async (updatedValues) => {
    try {
      const token = localStorage.getItem("token");
      const musicId = localStorage.getItem("musicId");

      const requestData = {
        musicId: musicId,
        ...updatedValues, // 변경값만 업데이트
      };

      console.log("Remixing 요청 데이터:", requestData);

      const response = await axios.post(
        `${API_BASE_URL}/task/remix`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      localStorage.setItem("taskId", response.data.result.taskId);
      const taskId = localStorage.getItem("taskId");
      if (response.status === 200) {
        console.log(" Remixing 요청 성공:", response.data);
        alert("리믹싱 작업 요청중입니다");
        fetchTaskStatus(taskId);
      } else {
        console.warn("리믹싱 요청 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("리믹싱 요청 오류:", error.message);
    }
  };
  const fetchTaskStatus = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const pollTask = async () => {
        const response = await axios.post(
          `${API_BASE_URL}/task/get-task`,
          { taskId: taskId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        console.log("작업 상태 조회:", response.data);

        if (response.data.result.processStatus === "COMPLETED") {
          console.log("작업 끝 음악 URL 조회 시작");
          fetchResultMusicUrl(taskId); // 작업 완료되면 url 가져오기
        } else {
          console.warn("작업 중, 3초 후 재시도...");
          setTimeout(pollTask, 3000); // 3초 후 다시 조회
        }
      };
      pollTask();
    } catch (error) {
      console.error("작업 상태 조회 오류:", error.message);
    }
  };

  const fetchResultMusicUrl = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/task/search?taskId=${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("작업 결과:", response.data);

      const resultMusicUrl = response.data.result.remixes[0].resultMusicUrl;

      if (resultMusicUrl) {
        console.log("믹싱된 음악 URL:", resultMusicUrl); 
        localStorage.setItem("resultMusicUrl", resultMusicUrl);
        setResultMusicUrl(resultMusicUrl);
      } else {
        console.warn("resultMusicUrl을 찾을 수 없음");
      }
    } catch (error) {
      console.error("결과 오류:", error.message);
    }
  };
  return (
    <ResultContentContainer title="리믹싱 결과" prevLink="/remixing">
      <ControlSection>
        <TabContainer>
          <Tab
            active={activeTab === "스케일"}
            onClick={() => setActiveTab("스케일")}
          >
            스케일
          </Tab>
          <Tab
            active={activeTab === "템포"}
            onClick={() => setActiveTab("템포")}
          >
            템포
          </Tab>
          <Tab
            active={activeTab === "리버브"}
            onClick={() => setActiveTab("리버브")}
          >
            리버브
          </Tab>
          <Tab
            active={activeTab === "코러스"}
            onClick={() => setActiveTab("코러스")}
          >
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
          handleToggle={handleToggle}
          requestRemixing={requestRemixing}
        />
        {resultMusicUrl && <OneAudioPlayer audioUrl={resultMusicUrl} />}
      </ControlSection>
    </ResultContentContainer>
  );
}

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
