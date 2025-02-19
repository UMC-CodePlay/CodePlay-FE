import styled from "styled-components";
import Switch from "./Switch";

const ControlPanel = ({
  activeTab,
  scale,
  tempo,
  // reverb를 boolean => number로 사용한다고 가정합니다.
  reverb,
  chorus,
  handleScaleChange,
  handleTempoChange,
  // 새로 추가할 handleReverbChange 함수
  handleReverbChange,
  // 토글 함수 - 리버브는 주석 처리
  handleToggle,
  setScale,
  setTempo
}) => {
  return (
    <Panel>
      {/* ----------------- 스케일 ----------------- */}
      {activeTab === '스케일' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleScaleChange('down')}>◀</ArrowButton>
            <ValueBox>
              <Value>{scale > 0 ? `+${scale}` : scale}</Value>
            </ValueBox>
            <ArrowButton onClick={() => handleScaleChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ResetButton>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {/* ----------------- 템포 ----------------- */}
      {activeTab === '템포' && (
        <ControlWrapper>
          <ValueControl>
            <ArrowButton onClick={() => handleTempoChange('down')}>◀</ArrowButton>
            <ValueBox>
              <Value>x{tempo.toFixed(1)}</Value>
            </ValueBox>
            <ArrowButton onClick={() => handleTempoChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ResetButton>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {/* ----------------- 리버브 -----------------
          기존 토글(Switch) 코드 => 주석 처리 
          아래는 숫자 증감 패널로 대체
       */}
      {activeTab === '리버브' && (
        <ControlWrapper>
          {/* <Switch isOn={reverb} onToggle={() => handleToggle('reverb')} /> */}
          <ValueControl>
            <ArrowButton onClick={() => handleReverbChange('down')}>◀</ArrowButton>
            <ValueBox>
              <Value>{reverb.toFixed(1)}</Value>
            </ValueBox>
            <ArrowButton onClick={() => handleReverbChange('up')}>▶</ArrowButton>
          </ValueControl>
          <ResetButton>적용하기</ResetButton>
        </ControlWrapper>
      )}

      {/* ----------------- 코러스 ----------------- */}
      {activeTab === '코러스' && (
        <Switch isOn={chorus} onToggle={() => handleToggle('chorus')} />
      )}
    </Panel>
  );
};

export default ControlPanel;

/* 스타일 정의 */
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
