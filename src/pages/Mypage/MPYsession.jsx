// src/pages/Mypage/MPYsession.jsx
import React from "react";
import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBar from "../../components/Mypg/SearchBarentire.jsx";
import Menu from "../../components/Mypg/Menu.jsx";
import Menu2 from '../../components/Mypg/Menu2.jsx'

import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

// 기존: import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

function MPYsession() {
  return (
    <div>
      <ConditionalNavbar />
      <Mypageletter />

      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <Introduce />

        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <SearchBar />
        </div>

        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <Menu />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Menu2 />
        </div>
        
      </div>
    </div>
  );
}

export default MPYsession;
