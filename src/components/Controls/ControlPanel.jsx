import styled from "styled-components";
import Switch from "./Switch";

const ControlPanel = ({ 
  activeTab, 
  scale, 
  tempo, 
  reverb, 
  chorus, 
  handleScaleChange, 
  handleTempoChange, 
  handleToggle, 
  requestRemixing 
}) => {
  return (
    <Panel>
      {activeTab === '스케일' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleScaleChange('down')}>◀</ArrowButton>
            <ValueBox><Value>{scale > 0 ? `+${scale}` : scale}</Value></ValueBox>
            <ArrowButton onClick={() => handleScaleChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ResetButton onClick={() => requestRemixing({ scaleModulation: scale })}>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {activeTab === '템포' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleTempoChange('down')}>◀</ArrowButton>
            <ValueBox><Value>x{tempo.toFixed(1)}</Value></ValueBox>
            <ArrowButton onClick={() => handleTempoChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ResetButton onClick={() => requestRemixing({ tempoRatio: tempo })}>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {activeTab === '리버브' && (
        <ControlWrapper>
          <Switch isOn={reverb} onToggle={() => handleToggle('reverb')} />
          <ResetButton onClick={() => requestRemixing({ reverbAmount: reverb ? 0.3 : 0 })}>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {activeTab === '코러스' && (
        <ControlWrapper>
          <Switch isOn={chorus} onToggle={() => handleToggle('chorus')} />
          <ResetButton onClick={() => requestRemixing({ isChorusOn: chorus })}>적용하기</ResetButton>
        </ControlWrapper>
      )}
    </Panel>
  );
};

export default ControlPanel;

/* =====================
   styled-components
===================== */

/**
 * Panel: 높이를 300px로 고정,
 * 내부 요소를 가로/세로 정 중앙에 배치
 */
const Panel = styled.div`
  width: 100%;
  height: 300px;               /* ★ 고정 높이 ★ */
  display: flex;
  justify-content: center;     /* 수평 중앙 */
  align-items: center;         /* 수직 중앙 */
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ValueControl = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #24B2E7;
  font-size: 40px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  
  &:hover {
    color: #1a8bb8;
  }
`;

const ValueBox = styled.div`
  background: #1A1A1A;
  padding: 20px 40px;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;
`;

const Value = styled.span`
  color: #24B2E7;
  font-size: 32px;
  font-weight: bold;
`;

const ResetButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #24B2E7;
  border-radius: 8px;
  background: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(36, 178, 231, 0.1);
  }
`;
