import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
import SocialLogin from "../../components/Login/SocialLogin";
import { useNavbar } from "../../context/NavbarContext"; // 추가: Navbar 변경 상태 가져오기
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const styles = {
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "left" },
  forgotPassword: { textAlign: "right", cursor: "pointer", color: "#6B46C1", textDecoration: "underline", marginBottom: "10px" },
  loginButton: { width: "100%", backgroundColor: "#6B46C1", color: "white", padding: "12px", borderRadius: "999px", fontSize: "16px", border: "none", cursor: "pointer", marginTop: "5px" },
  separator: { display: "flex", alignItems: "center", justifyContent: "center", marginTop: "15px", marginBottom: "15px" },
  signupContainer: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" },
  signupLink: { color: "#6B46C1", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" },
};

const Login = () => {
  const navigate = useNavigate();
  const { toggleNavbar } = useNavbar(); // ✅ Navbar 변경 함수 가져오기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(AuthContext);

const handleLogin = async (e) => {
  e.preventDefault();
    
  try {
    await loginUser(email, password);
    toggleNavbar();
    navigate("/");
  } catch (error) {
    alert("로그인 실패: " + error.message);
  }
};

  return (
    <AuthWrapper>
      <div>
        <h2 style={styles.title}>로그인</h2>
        <form onSubmit={handleLogin}>
          <InputField type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)} />
          <p style={styles.forgotPassword} onClick={() => navigate("/login/findpwd/auth")}>비밀번호를 잊으셨나요?</p>
          <Button text="로그인" onClick={handleLogin} />
        </form>

        <SocialLogin />

        {/* ✅ 회원가입 버튼 추가 */}
        <p style={styles.signupContainer}>
          아직 회원이 아니신가요? 
          <span style={styles.signupLink} onClick={() => navigate("/signup")}> Sign Up</span>
        </p>
      </div>
      
    </AuthWrapper>
  );
};

export default Login;
