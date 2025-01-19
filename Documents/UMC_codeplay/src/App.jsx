import React from "react";
import SearchBar from "./SearchBar"; // 검색 바 컴포넌트
import Menu from "./Menu"; // 상단 메뉴 컴포넌트
import Menu1 from "./Menu2"; // 음원 목록 컴포넌트

function App() {
  return (
    <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
      {/* 검색 바 */}
      <div style={{ borderBottom: "1px solid #E4E1E7" }}>
        <SearchBar />
      </div>

      {/* 상단 메뉴 */}
      <div style={{ borderBottom: "1px solid #E4E1E7" }}>
        <Menu />
      </div>

      {/* 음원 목록 */}
      <div style={{ marginTop: "20px" }}>
        <Menu1 />
      </div>
    </div>
  );
}

export default App;
