import React, { useEffect, useState } from "react";
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
    margin: "0px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SocialLogin = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  // 메인 창에서 팝업으로부터 postMessage로 전달된 결과 처리
  useEffect(() => {
    const handleMessage = (event) => {
      // 보안상 event.origin을 확인하는 게 좋습니다.
      console.log("📥 메인 창이 받은 postMessage:", event.data);
      const data = event.data;
      if (data && data.isSuccess) {
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("refreshToken", data.result.refreshToken);
        localStorage.setItem("email", data.result.email);
        console.log("✅ 토큰 저장 완료! 홈으로 이동합니다.");
        navigate("/", { replace: true });
      } else {
        alert("로그인 실패: " + (data?.message || "알 수 없는 오류"));
        navigate("/login", { replace: true });
      }
      if (popup && !popup.closed) {
        popup.close();
      }
    };
  
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]); // 필요한 의존성만 남김
  

  // OAuth 로그인 버튼 클릭 시 팝업을 열어 OAuth 인증 진행
  const handleSocialLogin = (provider) => {
    console.log(`🔄 ${provider} 로그인 버튼 클릭됨`);
    const w = 600, h = 700;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const popupWindow = window.open(
      `${API_BASE_URL}/oauth/authorize/${provider}`,
      "socialLoginPopup",
      `width=${w},height=${h},top=${top},left=${left}`
    );
    setPopup(popupWindow);
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
