import './header.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import SessionButton from '../Buttons/SessionButton';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header" className="header container">
      <h1 className="title">CODEPLAY</h1>
      <p className="subtitle">리스너와 작곡가를 위한 음악 분석 웹 애플리케이션.</p>
      
      <ButtonContainer>
        <StyledPrimaryButton><Link to="/harmony">화성분석 바로가기 →</Link></StyledPrimaryButton>
        <StyledSessionButton><Link to="/harmony">세션분리 하러가기 →</Link></StyledSessionButton>
      </ButtonContainer>
    </header>
  );
};

export default Header;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;
  width: 100%;
  margin-top: 20px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 300px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 50px;
`;

const StyledSessionButton = styled(SessionButton)`
  width: 300px;
  height: 59px;
  padding: 15px 30px;
  border-radius: 50px;
`;