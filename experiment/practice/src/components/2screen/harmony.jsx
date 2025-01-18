import './harmony.css'

const Harmony=()=>{
  return(
    <section id="harmony" className="harmony-analysis">
        <h2 className="section-title">화성 분석</h2>
        <p className="section-description">
          예시텍스트 입니다. 화성분석에 대한 설명글이 들어갈 예정입니다.
        </p>
        <div className="harmony-info">
          <div className="info-container">
            <p className="info-label">Key</p>
            <div className="info-item"><span>F#</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">Scale</p>
            <div className="info-item"><span>Major</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">Chord</p>
            <div className="info-item"><span>I-IV-V</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">BPM</p>
            <div className="info-item"><span>100</span></div>
          </div>
          <div className="info-container">
            <p className="info-label">음압</p>
            <div className="info-item"><span>100</span></div>
          </div>
        </div>
        <button className="harmony-button">화성 분석 바로가기 →</button>
    </section>

  );

};

export default Harmony;