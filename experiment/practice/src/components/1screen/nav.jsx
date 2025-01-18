import './nav.css';

const Nav = () => {
  return (
    <nav className="nav container">
      <div className="nav-left">
        <a href="#home" className="logo">
          {/* 로고 이미지 삽입 */}
          <img src="" alt="로고" className="logo-image" />
        </a>
      </div>
      <div className="nav-right">
        <a href="#harmony">화성 분석</a>
        <a href="#score">악보 생성</a>
        <a href="#stem">스템 분리</a>
        <button className="login-button">로그인</button>
      </div>
    </nav>
  );
};

export default Nav;
