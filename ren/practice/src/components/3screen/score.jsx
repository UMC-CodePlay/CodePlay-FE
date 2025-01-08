import './score.css'

const Score=()=>{
  return(
      <section id="score" className="score-analysis">
        <h2 className="section-title">악보 생성</h2>
        <p className="section-description">
          곡의 화성정보가 포함된 간단한 악보를 생성하여 제공합니다.
        </p>
        <button className="score-button">악보 생성 바로가기 →</button>
      </section>

  );
};

export default Score;