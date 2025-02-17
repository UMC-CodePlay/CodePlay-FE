// src/pages/Mypage/Mypagehold.jsx
import React from "react";
import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBar from "../../components/Mypg/SearchBarentire.jsx";
import Menu from "../../components/Mypg/Menu.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

// 기존: import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

function Mypagehold() {
  return (
    <div>
      {/* 로그인 여부에 따라 Navbar vs. NavbarLog 자동 전환 */}
      <ConditionalNavbar />
      <Mypageletter />

      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <Introduce />

        {/* 검색 바 */}
        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <SearchBar />
        </div>

        {/* 상단 메뉴 */}
        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Mypagehold;
