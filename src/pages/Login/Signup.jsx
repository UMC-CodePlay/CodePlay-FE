import React, { useState } from "react";
import signupBg from "../../assets/Login_img/signup_bg.png";
import googleIcon from "../../assets/Login_img/login_google.svg";
import kakaoIcon from "../../assets/Login_img/login_kakaotalk.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    leftPanel: {
      flex: 1,
      backgroundImage: `url(${signupBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    rightPanel: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    formWrapper: {
      width: "400px",
      background: "white",
      padding: "30px",
    },
    title: {
      textAlign: "left",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "10px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    inputContainer: {
      display: "flex",
      gap: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    outlinedButton: {
      padding: "10px",
      background: "#fff",
      color: "#6F3DA1",
      border: "2px solid #6F3DA1",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      minWidth: "120px",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#6F3DA1",
      color: "white",
      border: "none",
      borderRadius: "50px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    separator: {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      margin: "20px 0",
    },
    separatorLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#ccc",
    },
    separatorText: {
      margin: "0 10px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#666",
    },
    socialLogin: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "10px",
    },
    socialIcon: {
      width: "40px",
      height: "40px",
      cursor: "pointer",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
    },
    checkbox: {
      marginRight: "8px",
    },
    termsText: {
      color: "#6F3DA1",
      textDecoration: "underline",
      cursor: "pointer",
    },
    normalText: {
      color: "#333",
    },
    errorText: {
      color: "red",
      fontSize: "12px",
      marginTop: "5px",
      textAlign: "right",
    },
  };

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let isValid = true;

    // 이메일 검증
    if (!validateEmail(email)) {
      setEmailError("올바른 형식의 이메일이 아닙니다.");
      isValid = false;
    } else {
      setEmailError("");
    }

    // 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      alert("회원가입 성공!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}></div>
      <div style={styles.rightPanel}>
        <div style={styles.formWrapper}>
          <h2 style={styles.title}>회원가입</h2>
          <form onSubmit={handleSignup} noValidate>
            {/* 이메일 입력 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>이메일</label>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <button type="button" style={styles.outlinedButton}>
                  인증번호 받기
                </button>
              </div>
              {emailError && <div style={styles.errorText}>{emailError}</div>}
            </div>

            {/* 인증번호 입력 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>인증번호</label>
              <div style={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  style={styles.input}
                />
                <button type="button" style={styles.outlinedButton}>
                  인증하기
                </button>
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
              {passwordError && <div style={styles.errorText}>{passwordError}</div>}
            </div>

            {/* 이메일 수집 동의 */}
            <div style={styles.checkboxContainer}>
              <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} style={styles.checkbox} />
              <span style={styles.termsText}>이메일 수집 및 이용</span>
              <span style={styles.normalText}> 에 동의합니다.</span>
            </div>

            {/* 회원가입 버튼 */}
            <button type="submit" style={styles.button}>
              회원가입
            </button>

            {/* 구분선 */}
            <div style={styles.separator}>
              <div style={styles.separatorLine}></div>
              <div style={styles.separatorText}>또는</div>
              <div style={styles.separatorLine}></div>
            </div>

            {/* 소셜 로그인 */}
            <div style={styles.socialLogin}>
              <img src={googleIcon} alt="Google Login" style={styles.socialIcon} />
              <img src={kakaoIcon} alt="KakaoTalk Login" style={styles.socialIcon} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
