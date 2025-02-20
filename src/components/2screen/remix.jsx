import "./harmony.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomePgButton from "../Buttons/HomeGreenButton";
import HomehIcon from "../../assets/remix_ex.svg";

const Harmony = () => {
  return (
    <section className="harmony-analysis">
      <h2 className="section-title">간편하게 내 맘대로 리믹스</h2>
      <p className="section-description">
        코드플레이의 온라인 음악분석기를 이용하면, 피치/템포/리버브/코러스를 손쉽게 조절할 수 있습니다.
      </p>
      <GraphContainer>
        <GraphImage src={HomehIcon} alt="리믹스 그래프" />
      </GraphContainer>
      <ButtonContainer>
        <HomePgButton>
          <Link to="/remixing">리믹싱 바로가기 →</Link>
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
