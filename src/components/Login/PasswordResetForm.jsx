import React, { useState } from "react";

const PasswordResetForm = ({ onSendCode, onVerifyCode }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    onSendCode(email);
    setIsCodeSent(true);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSendCode} className="w-full bg-purple-500 text-white p-2 rounded mt-2">
        인증번호 받기
      </button>

      {isCodeSent && (
        <>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <button
            onClick={() => onVerifyCode(code)}
            className="w-full bg-purple-500 text-white p-2 rounded mt-2"
          >
            인증하기
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordResetForm;
