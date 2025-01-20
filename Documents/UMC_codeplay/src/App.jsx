import React from "react";
import SearchBar from "./SearchBar";
import Menu from "./Menu";
import Menu1 from "./Menu4";


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
