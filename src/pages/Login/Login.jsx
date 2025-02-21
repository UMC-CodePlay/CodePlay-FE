import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
import SocialLogin from "../../components/Login/SocialLogin";
import { useNavbar } from "../../context/NavbarContext";

const styles = {
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    textAlign: "left",
  },
  forgotPassword: {
    textAlign: "right",
    cursor: "pointer",
    color: "#6B46C1",
    textDecoration: "underline",
    marginBottom: "10px",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#6B46C1",
    color: "white",
    padding: "12px",
    borderRadius: "999px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "5px",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15px",
    marginBottom: "15px",
  },
  separatorLine: { flex: 1, height: "1px", backgroundColor: "#ccc" },
  separatorText: {
    margin: "0 10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#666",
  },
  signupContainer: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  signupLink: {
    color: "#6B46C1",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { toggleNavbar } = useNavbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await login(email, password);
      console.log("로그인 성공:", response.data);

      localStorage.setItem("token", response.data.result.token);
      localStorage.setItem("refreshToken", response.data.result.refreshToken);
      localStorage.setItem("email", email);

      toggleNavbar();
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <AuthWrapper>
      <div>
        <h2 style={styles.title}>로그인</h2>
        <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
          <InputField
            type="email"
            allign="center"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            allign="center"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px", textAlign: "right" }}>
              {errorMessage}
            </p>
          )}
          <p
            style={styles.forgotPassword}
            onClick={() => navigate("/login/findpwd/auth")}
          >
            비밀번호를 잊으셨나요?
          </p>
          <Button text="로그인" onClick={handleLogin} />
        </form>

        <div style={styles.separator}>
          <div style={styles.separatorLine}></div>
          <div style={styles.separatorText}>또는</div>
          <div style={styles.separatorLine}></div>
        </div>

        <SocialLogin />

        <p style={styles.signupContainer}>
          아직 회원이 아니신가요?{" "}
          <span style={styles.signupLink} onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default Login;
