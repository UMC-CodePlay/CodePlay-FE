import React from "react";
import googleIcon from "../../assets/Login_img/login_google.svg";
import kakaoIcon from "../../assets/Login_img/login_kakaotalk.svg";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  button: {
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

const SocialLogin = () => {
  return (
    <div style={styles.container}>
      <img src={googleIcon} alt="Google 로그인" style={styles.button} />
      <img src={kakaoIcon} alt="Kakao 로그인" style={styles.button} />
    </div>
  );
};

export default SocialLogin;
