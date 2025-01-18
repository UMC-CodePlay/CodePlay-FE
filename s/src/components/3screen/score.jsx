import './score.css';
import Logo31 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/3-1.svg';
import Logo32 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/3-2.svg';
import Logo33 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/3-3.svg';
import Logo34 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/3-4.svg';


const Score = () => {
  return (
    <section  className="score-analysis container">
      <h2 className="section-title1">악보 생성</h2>
      <p className="section-description">
        곡의 화성정보가 포함된 간단한 악보를 생성하여 제공합니다.
      </p>

      {/* 아이콘 목록 추가 */}
      <div className="icon-container">
        <div className="icon-item">
          <img src={Logo31} alt="키보드" className="icon-image" />
          <p className="icon-label">키보드</p>
        </div>
        <div className="icon-item">
          <img src={Logo32} alt="기타" className="icon-image" />
          <p className="icon-label">기타</p>
        </div>
        <div className="icon-item">
          <img src={Logo33} alt="드럼" className="icon-image" />
          <p className="icon-label">드럼</p>
        </div>
        <div className="icon-item">
          <img src={Logo34} alt="베이스" className="icon-image" />
          <p className="icon-label">베이스</p>
        </div>
      </div>

      <button className="score-button">악보 생성 바로가기 →</button>
    </section>
  );
};

export default Score;