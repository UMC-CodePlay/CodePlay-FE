import React from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";
import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    console.log("로그인 시도:", email, password);
  };

  return (
    <AuthWrapper>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>로그인</h2>
      <LoginForm onLogin={handleLogin} onForgotPassword={() => navigate("/login/password-reset")} />
    </AuthWrapper>
  );
};

export default Login;
