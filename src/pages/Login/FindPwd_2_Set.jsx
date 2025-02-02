import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";

const FindPwd_2_Set = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = () => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setErrorMessage("");
    navigate("/login/findpwd/done"); // ✅ 비밀번호 변경 완료 페이지로 이동
  };

  return (
    <AuthWrapper>
      <div>
        <h2>비밀번호 재설정</h2>
        <InputField type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputField type="password" placeholder="비밀번호를 한 번 더 입력해주세요." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errorMessage && <p style={{ color: "#E53E3E", fontSize: "14px", textAlign: "right" }}>{errorMessage}</p>}
        
        <Button text="비밀번호 변경하기" onClick={handleChangePassword} variant="primary" />
        <Button text="이전으로" onClick={() => navigate("/login/findpwd/auth")} variant="secondary" /> {/* ✅ 이전 버튼 추가 */}
      </div>
    </AuthWrapper>
  );
};

export default FindPwd_2_Set;
