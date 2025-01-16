import styled from "styled-components";
import "./2screen/harmony.css";

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
    </>
  );
};

export default Result_Harmony;

const To_under_button = styled.div`
  padding-top: 80px;
`;

const ResultsConatiner = styled.div``;
