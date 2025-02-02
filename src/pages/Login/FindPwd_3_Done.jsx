import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthWrapper from "../../components/Login/AuthWrapper";
import Button from "../../components/Login/Button";

const styles = {
  messageContainer: { textAlign: "center", marginBottom: "20px" },
  emailText: { color: "#6F3DA1", fontSize: "18px", fontWeight: "bold" },
  messageText: { fontSize: "18px", fontWeight: "bold", marginTop: "5px" },
};

const FindPwd_3_Done = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "unknown@example.com";

  return (
    <AuthWrapper>
      <div style={styles.messageContainer}>
        <p style={styles.emailText}>{email} 님의</p>
        <p style={styles.messageText}>비밀번호 재설정이 완료되었습니다.</p>
      </div>
      <Button text="로그인으로 돌아가기" onClick={() => navigate("/login")} variant="primary" />
    </AuthWrapper>
  );
};

export default FindPwd_3_Done;
