import './stem.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePgSessionButton from '../Buttons/HomePgSessionButton';
import HomesIcon from "../../assets/HomesIcon.svg";

const Stem = () => {
  return (
    <section  className="stem-analysis">
      <h2 className="section-title">클릭 한 번으로 섞인 음악을 분리하기</h2>
      <p className="section-description">
        예시 텍스트입니다. 세션분리에 대한 설명글이 들어갈 예정입니다.
      </p>

      <IconContainer>
        <IconImage src={HomesIcon} alt="세션 분리 아이콘" />
      </IconContainer>

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
  margin: 36px auto;
`;

const IconImage = styled.img`
  width: 100%;
  height: auto;
`;