import React from "react";
import googleIcon from "../../assets/Login_img/login_google.svg";
import kakaoIcon from "../../assets/Login_img/login_kakaotalk.svg";
import { googleLogin, kakaoLogin } from "../../services/authService"; // ✅ 수정된 API 호출 방식 사용

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  button: {
    width: "50px",
    height: "50px",
    margin: "0px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

const SocialLogin = () => {
  return (
    <div style={styles.container}>
      <img src={googleIcon} alt="Google 로그인" style={styles.button} onClick={googleLogin} />
      <img src={kakaoIcon} alt="Kakao 로그인" style={styles.button} onClick={kakaoLogin} />
    </div>
  );
};

export default SocialLogin;
