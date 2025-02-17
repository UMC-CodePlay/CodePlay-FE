// src/components/ConditionalNavbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import NavbarLog from "./Mypg/NavbarLog";

function ConditionalNavbar() {
  const { token, logout } = useContext(AuthContext);

  // 토큰이 있으면 로그인 상태 → NavbarLog, 없으면 Navbar
  if (token) {
    return <NavbarLog logout={logout} />;
  } else {
    return <Navbar />;
  }
}

export default ConditionalNavbar;
