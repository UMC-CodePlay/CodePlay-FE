import React from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";

const PasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <h2 className="text-2xl font-semibold text-center">비밀번호 변경 완료</h2>
      <p className="text-center text-gray-500">codeplay123@naver.com 님의 비밀번호 재설정이 완료되었습니다.</p>
      <button className="w-full bg-purple-600 text-white p-3 rounded-md" onClick={() => navigate("/login")}>
        로그인으로 돌아가기
      </button>
    </AuthWrapper>
  );
};

export default PasswordSuccess;
