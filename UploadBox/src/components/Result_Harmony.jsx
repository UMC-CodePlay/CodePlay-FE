import "./2screen/harmony.css";
import styled from "styled-components";

const Result_Harmony = () => {
  return (
    <>
      <To_under_button>
        <div className="harmony-info">
          <div className="info-container">
            <p className="info-label">Key</p>
            <div className="info-item">
              <span>F#</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">Scale</p>
            <div className="info-item">
              <span>Major</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">Chord</p>
            <div className="info-item">
              <span>I-IV-V</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">BPM</p>
            <div className="info-item">
              <span>100</span>
            </div>
          </div>
          <div className="info-container">
            <p className="info-label">음압</p>
            <div className="info-item">
              <span>100</span>
            </div>
          </div>
        </div>
      </To_under_button>
      <ResultConatiner>
        <ResultBox></ResultBox>
      </ResultConatiner>
    </>
  );
};

export default Result_Harmony;

const To_under_button = styled.div`
  padding-top: 80px;
`;

const ResultConatiner = styled.div`
  display: flex;
  justify-content: center;
`;

const ResultBox = styled.div`
  margin-top: 50px;
  display: flex;
  width: 1083px;
  padding: 64px 64px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 30px;
  background: var(--badkground, #f9f9f9);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ResultContents = styled.div``;

const Result_title = styled.div``;

const Result_content = styled.div``;

const To_Before = styled.Button``;
