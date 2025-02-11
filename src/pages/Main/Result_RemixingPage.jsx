import styled from "styled-components";
import { useState } from "react";
import ResultContentContainer from "../../components/Container/ResultContentContainer";
import ControlPanel from "../../components/Controls/ControlPanel";

const Result_RemixingPage = () => {
  const [activeTab, setActiveTab] = useState('스케일');
  const [scale, setScale] = useState(0);
  const [tempo, setTempo] = useState(1.0);
  const [reverb, setReverb] = useState(false);
  const [chorus, setChorus] = useState(false);

  const handleScaleChange = (direction) => {
    if (direction === 'up' && scale < 12) {
      setScale(prev => prev + 1);
    } else if (direction === 'down' && scale > -12) {
      setScale(prev => prev - 1);
    }
  };

  const handleTempoChange = (direction) => {
    if (direction === 'up') {
      setTempo(prev => Number((prev + 0.1).toFixed(1)));
    } else if (direction === 'down' && tempo > 0.1) {
      setTempo(prev => Number((prev - 0.1).toFixed(1)));
    }
  };

  const handleToggle = (feature) => {
    if (feature === 'reverb') {
      setReverb(!reverb);
    } else if (feature === 'chorus') {
      setChorus(!chorus);
    }
  };

  return (
    <ResultContentContainer 
      title="'파일 이름'의 리믹싱 결과"
      prevLink="/remixing"
      otherSystem1="화성 분석"
      otherSystem2="세션 분리"
    >
      <ControlSection>
        <TabContainer>
          <Tab active={activeTab === '스케일'} onClick={() => setActiveTab('스케일')}>스케일</Tab>
          <Tab active={activeTab === '템포'} onClick={() => setActiveTab('템포')}>템포</Tab>
          <Tab active={activeTab === '리버브'} onClick={() => setActiveTab('리버브')}>리버브</Tab>
          <Tab active={activeTab === '코러스'} onClick={() => setActiveTab('코러스')}>코러스</Tab>
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
          setScale={setScale}
          setTempo={setTempo}
        />
      </ControlSection>
    </ResultContentContainer>
  );
};

const ControlSection = styled.div`
  width: 1090px;
  height: 500px;
  background: #1A1A1A;
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
  background: ${props => props.active ? '#24B2E7' : 'transparent'};
  color: white;
  cursor: pointer;
`;

export default Result_RemixingPage; 