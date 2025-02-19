import './stem.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePgSessionButton from '../Buttons/HomeBlueButton';
import StemIcons from "./StemIcons";

const Stem = () => {
  return (
    <section  className="stem-analysis">
      <h2 className="section-title">클릭 한 번으로 섞인 음악을 분리하기</h2>
      <p className="section-description">
        코드플레이의 온라인 음악 분석기를 이용하면, 트랙을 빠르게 분리할 수 있습니다.
      </p>

      <StemIcons></StemIcons>

      <ButtonContainer>
        <HomePgSessionButton>
          <Link to="/session">세션 분리 바로가기 →</Link>
        </HomePgSessionButton>
      </ButtonContainer>
    </section>
  );
};

export default Stem;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1198px;
  height: 274px;
  margin: auto;
`;

const IconImage = styled.img`
  width: 100%;
  height: auto;
`;