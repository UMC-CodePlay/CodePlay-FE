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
  setScale, 
  setTempo, 
  requestRemixing // requestRemixing 함수 전달
}) => {
  return (
    <Panel>
      {/* 🔹 스케일 조절 */}
      {activeTab === '스케일' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleScaleChange('down')}>◀</ArrowButton>
            <ValueBox>
              <Value>{scale > 0 ? `+${scale}` : scale}</Value>
            </ValueBox>
            <ArrowButton onClick={() => handleScaleChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ApplyButton onClick={requestRemixing}>적용하기</ApplyButton> 
        </ControlWrapper>
      )}

      {/* 🔹 템포 조절 */}
      {activeTab === '템포' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleTempoChange('down')}>◀</ArrowButton>
            <ValueBox>
              <Value>x{tempo.toFixed(1)}</Value>
            </ValueBox>
            <ArrowButton onClick={() => handleTempoChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ApplyButton onClick={requestRemixing}>적용하기</ApplyButton> 
        </ControlWrapper>
      )}

      {/* 🔹 리버브 토글 */}
      {activeTab === '리버브' && (
        <ControlWrapper>
          <Switch isOn={reverb} onToggle={() => handleToggle('reverb')} />
          <ApplyButton onClick={requestRemixing}>적용하기</ApplyButton> 
        </ControlWrapper>
      )}

      {/* 🔹 코러스 토글 */}
      {activeTab === '코러스' && (
        <ControlWrapper>
          <Switch isOn={chorus} onToggle={() => handleToggle('chorus')} />
          <ApplyButton onClick={requestRemixing}>적용하기</ApplyButton> 
        </ControlWrapper>
      )}
    </Panel>
  );
};

// 🎨 스타일
const Panel = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ApplyButton = styled.button`
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

export default ControlPanel;
