import './score.css';

const Score = () => {
  return (
    <section id="score" className="score-analysis container">
      <h2 className="section-title1">악보 생성</h2>
      <p className="section-description">
        곡의 화성정보가 포함된 간단한 악보를 생성하여 제공합니다.
      </p>

      {/* 아이콘 목록 추가 */}
      <div className="icon-container">
        <div className="icon-item">
          <img src="path/to/keyboard-icon.png" alt="키보드" className="icon-image" />
          <p className="icon-label">키보드</p>
        </div>
        <div className="icon-item">
          <img src="path/to/guitar-icon.png" alt="기타" className="icon-image" />
          <p className="icon-label">기타</p>
        </div>
        <div className="icon-item">
          <img src="path/to/drum-icon.png" alt="드럼" className="icon-image" />
          <p className="icon-label">드럼</p>
        </div>
        <div className="icon-item">
          <img src="path/to/bass-icon.png" alt="베이스" className="icon-image" />
          <p className="icon-label">베이스</p>
        </div>
      </div>

      <button className="score-button">악보 생성 바로가기 →</button>
    </section>
  );
};

export default Score;