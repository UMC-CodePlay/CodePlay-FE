import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";

const styles = {
  label: { fontSize: "16px", fontWeight: "bold", marginBottom: "5px", textAlign: "left", display: "block" },
  inputContainer: { display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-start" },
  verifyButton: { width: "120px", padding: "10px", border: "1px solid #6B46C1", backgroundColor: "white", color: "#6B46C1", borderRadius: "6px", cursor: "pointer" },
  errorText: { color: "#E53E3E", fontSize: "14px", marginTop: "5px", textAlign: "right" },
};

const FindPwd_1_Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendCode = () => {
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    setErrorMessage("");

    // ✅ 2번 페이지(비밀번호 설정)로 이동
    navigate("/login/findpwd/set");
  };

  return (
    <AuthWrapper>
      <div>
        <h2>비밀번호 찾기</h2>

        <label style={styles.label}>이메일</label>
        <div style={styles.inputContainer}>
          <InputField type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
          <button style={styles.verifyButton} onClick={handleSendCode}>인증번호 받기</button>
        </div>

        <label style={styles.label}>인증번호</label>
        <div style={styles.inputContainer}>
          <InputField type="text" placeholder="인증번호를 입력해주세요." value={code} onChange={(e) => setCode(e.target.value)} />
          <button style={styles.verifyButton}>인증하기</button>
        </div>

        {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

        <Button text="다음으로 넘어가기" onClick={() => navigate("/login/findpwd/set")} variant="primary" />
        <Button text="이전으로" onClick={() => navigate("/login")} variant="secondary" /> {/* ✅ 이전 버튼 추가 */}
      </div>
    </AuthWrapper>
  );
};

export default FindPwd_1_Auth;
