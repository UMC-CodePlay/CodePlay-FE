import './stem.css';
import Logo41 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/4-1.svg';
import Logo42 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/4-2.svg';
import Logo43 from '/Users/janwo/Desktop/experiment/practice/src/assets/image/4-3.svg';


const Stem = () => {
  return (
    <section  className="stem-analysis">
      <h2 className="section-title">스템 분리</h2>
      <p className="section-description">
        예시 텍스트입니다. 스템분리에 대한 설명글이 들어갈 예정입니다.
      </p>
      <div className="stem-container">
        {/* 첫 번째 항목 */}
        <div className="stem-item">
          <img
            src={Logo41}
            alt="MR 추출 이미지"
            className="stem-image"
          />
          <p className="stem-title">MR 추출</p>
          <p className="stem-description">
            곡에서 보컬을 제거하여 반주(MR)를 제공합니다.
          </p>
        </div>

        {/* 두 번째 항목 */}
        <div className="stem-item">
          <img
            src={Logo42}
            alt="드럼 트랙 분리 이미지"
            className="stem-image"
          />
          <p className="stem-title">드럼 트랙 분리</p>
          <p className="stem-description">이것은 설명입니다.</p>
        </div>

        {/* 세 번째 항목 */}
        <div className="stem-item">
          <img
            src={Logo43}
            alt="베이스 트랙 분리 이미지"
            className="stem-image"
          />
          <p className="stem-title">베이스 트랙 분리</p>
          <p className="stem-description">이것은 설명입니다.</p>
        </div>
      </div>
      <button className="stem-button">스템분리 바로가기 →</button>
    </section>
  );
};

export default Stem;
