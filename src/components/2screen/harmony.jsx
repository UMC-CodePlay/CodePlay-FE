import "./harmony.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomePgButton from "../Buttons/HomePurpleButton";
import HomehIcon from "../../assets/harmony_ex.svg";

const Harmony = () => {
  return (
    <section className="harmony-analysis">
      <h2 className="section-title">좋아하는 노래의 화성을 분석하기</h2>
      <p className="section-description">
        코드플레이의 온라인 음악분석기를 이용하면, 음악의 화성정보를 확인할 수 있습니다.
      </p>
      <GraphContainer>
        <GraphImage src={HomehIcon} alt="화성 분석 그래프" />
      </GraphContainer>
      <ButtonContainer>
        <HomePgButton>
          <Link to="/harmony">화성 분석 바로가기 →</Link>
        </HomePgButton>
      </ButtonContainer>
    </section>
  );
};

export default Harmony;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 805px;
  height: 219px;
  margin: 20px auto;
`;

const GraphImage = styled.img`
  width: 100%;
  height: auto;
`;
