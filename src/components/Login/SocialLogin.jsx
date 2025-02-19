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
      <img src={googleIcon} alt="Google 로그인" style={styles.button} onClick={() => console.log("Google 로그인 버튼 클릭됨")} />
      <img src={kakaoIcon} alt="Kakao 로그인" style={styles.button} onClick={() => console.log("Kakao 로그인 버튼 클릭됨")} />
    </div>
  );
};

export default SocialLogin;
