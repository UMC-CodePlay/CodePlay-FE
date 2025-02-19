import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword } from "../../services/authService";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";

const FindPwd_2_Set = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async () => {
    if (password.trim() === "" || confirmPassword.trim() === "") {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await changePassword(email, password);
      navigate("/login/findpwd/done");
    } catch (error) {
      setErrorMessage("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <AuthWrapper>
      <div>
        <h2>비밀번호 재설정</h2>
        <InputField type="password" placeholder="새 비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputField type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        
        <Button text="비밀번호 변경하기" onClick={handleChangePassword} />
      </div>
    </AuthWrapper>
  );
};

export default FindPwd_2_Set;
