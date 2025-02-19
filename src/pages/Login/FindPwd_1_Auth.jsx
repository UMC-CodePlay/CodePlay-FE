import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../../services/authService";
import AuthWrapper from "../../components/Login/AuthWrapper";
import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";

const FindPwd_1_Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendCode = async () => {
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await requestPasswordReset(email);
      setSuccessMessage("인증번호가 이메일로 발송되었습니다.");
    } catch (error) {
      setErrorMessage("이메일 전송에 실패했습니다.");
    }
  };

  return (
    <AuthWrapper>
      <div>
        <h2>비밀번호 찾기</h2>

        <label>이메일</label>
        <div>
          <InputField type="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleSendCode}>인증번호 받기</button>
        </div>

        <label>인증번호</label>
        <div>
          <InputField type="text" placeholder="인증번호 입력" value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={() => navigate("/login/findpwd/set", { state: { email, code } })}>인증하기</button>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <Button text="다음으로 넘어가기" onClick={() => navigate("/login/findpwd/set", { state: { email, code } })} />
      </div>
    </AuthWrapper>
  );
};

export default FindPwd_1_Auth;
