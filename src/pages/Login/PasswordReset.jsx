import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <AuthWrapper>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>비밀번호 재설정</h2>
      <input type="email" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px", border: "1px solid #D1D5DB", borderRadius: "6px", fontSize: "16px" }} />
      <button style={{ width: "100%", backgroundColor: "#6B46C1", color: "white", padding: "12px", borderRadius: "6px", fontSize: "16px", border: "none", cursor: "pointer", marginTop: "10px" }} onClick={() => navigate("/login/password-change")}>
        인증번호 받기
      </button>
    </AuthWrapper>
  );
};

export default PasswordReset;
