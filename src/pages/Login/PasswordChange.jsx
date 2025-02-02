import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-semibold">비밀번호 변경</h2>
      <input
        type="password"
        placeholder="새 비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-md"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 border rounded-md mt-3"
      />
      <button className="w-full bg-purple-600 text-white p-3 rounded-md" onClick={() => navigate("/login/password-success")}>
        비밀번호 변경하기
      </button>
    </AuthWrapper>
  );
};

export default PasswordChange;
