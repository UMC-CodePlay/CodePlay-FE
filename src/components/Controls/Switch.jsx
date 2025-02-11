import styled from "styled-components";

const Switch = ({ isOn, onToggle }) => {
  return (
    <ToggleSwitch onClick={onToggle} isOn={isOn}>
      <SwitchText>{isOn ? 'ON' : 'OFF'}</SwitchText>
      <SwitchKnob isOn={isOn} />
    </ToggleSwitch>
  );
};

const ToggleSwitch = styled.div`
  width: 120px;
  height: 60px;
  background: ${props => props.isOn ? '#24B2E7' : '#666'};
  border-radius: 30px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  transition: background 0.3s;
`;

const SwitchText = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 18px;
`;

const SwitchKnob = styled.div`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 25px;
  position: absolute;
  right: ${props => props.isOn ? '5px' : 'auto'};
  left: ${props => props.isOn ? 'auto' : '5px'};
  transition: all 0.3s;
`;

export default Switch; 