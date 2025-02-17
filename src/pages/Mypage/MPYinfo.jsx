// src/pages/Mypage/MPYinfo.jsx
import React from "react";
// 기존: import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

import Mypageinfo from "../../components/Mypg/Mypageinfo.jsx";
import Loginmodi from "../../components/Mypg/Loginmodi.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

function MPYinfo() {
  return (
    <div>
      <ConditionalNavbar />
      <Mypageinfo />
      <Loginmodi />
    </div>
  );
}

export default MPYinfo;
