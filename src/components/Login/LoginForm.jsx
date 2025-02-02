import React, { useState } from "react";

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  fontSize: "16px",
  marginBottom: "10px",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "#6B46C1",
  color: "white",
  padding: "12px",
  borderRadius: "6px",
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
};

const errorTextStyle = {
  color: "#E53E3E",
  fontSize: "14px",
  marginBottom: "10px",
};

const socialButtonStyle = {
  display: "inline-block",
  padding: "10px",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "5px",
};

const LoginForm = ({ onLogin, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <p style={errorTextStyle}>비밀번호나 아이디가 일치하지 않습니다.</p>
      <button type="submit" style={buttonStyle}>로그인</button>
      <p style={{ textAlign: "center", cursor: "pointer", color: "#6B46C1", marginTop: "10px" }} onClick={onForgotPassword}>비밀번호를 잊으셨나요?</p>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <span style={socialButtonStyle}>G</span>
        <span style={socialButtonStyle}>K</span>
      </div>
    </form>
  );
};

export default LoginForm;
