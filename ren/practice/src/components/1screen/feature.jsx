import './feature.css'

const Feature=()=>{
  return(
    <section id="features" className="features">
        <div className="feature-item">
          <div className="icon">🎼</div>
          <p>화성분석</p>
        </div>
        <div className="feature-item">
          <div className="icon">🎵</div>
          <p>악보분석</p>
        </div>
        <div className="feature-item">
          <div className="icon">🎚️</div>
          <p>스템분리</p>
        </div>
    </section>

  );
};

export default Feature;