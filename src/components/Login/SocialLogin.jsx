import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
    margin: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SocialLogin = () => {
  const navigate = useNavigate();
  const popupRef = useRef(null);

useEffect(() => {
  const handleMessage = (event) => {


    console.log("메인 창이 받은 postMessage:", event.data);
    // 서버에서 전달한 data = { accessToken: "...", refreshToken: "...", email: "..." }

    // accessToken이 존재하면 성공 처리
    if (event.data && event.data.accessToken) {
      localStorage.setItem("token", event.data.accessToken);
      localStorage.setItem("refreshToken", event.data.refreshToken);
      localStorage.setItem("email", event.data.email);

      console.log("✅ 토큰 및 이메일 저장 완료! 홈으로 이동합니다.");
      navigate("/", { replace: true });
    } else {
      alert("로그인 실패: " + (event.data?.message || "알 수 없는 오류"));
      navigate("/login", { replace: true });
    }

    // 팝업 창이 열려 있다면 닫기
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }
  };

  window.addEventListener("message", handleMessage);
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, [navigate]);


  const handleSocialLogin = (provider) => {
    console.log(`🔄 ${provider} 로그인 버튼 클릭됨`);
    const w = 600, h = 700;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    popupRef.current = window.open(
      `${API_BASE_URL}/oauth/authorize/${provider}`,
      "socialLoginPopup",
      `width=${w},height=${h},top=${top},left=${left}`
    );
  };

  return (
    <div style={styles.container}>
      <img
        src={googleIcon}
        alt="Google 로그인"
        style={styles.button}
        onClick={() => handleSocialLogin("google")}
      />
      <img
        src={kakaoIcon}
        alt="Kakao 로그인"
        style={styles.button}
        onClick={() => handleSocialLogin("kakao")}
      />
    </div>
  );
};

export default SocialLogin;
