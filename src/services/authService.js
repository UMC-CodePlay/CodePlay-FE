import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ;

export const signup = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const refreshToken = async (email, refreshToken) => {
  return axios.post(
    `${API_BASE_URL}/auth/refresh?email=${email}`,
    {},
    { headers: { "Refresh-Token": refreshToken } }
  );
};

export const requestPasswordReset = async (email) => {
  return axios.post(`${API_BASE_URL}/auth/password/reset/request`, { email });
};

export const verifyResetCode = async (email, code) => {
  return axios.post(`${API_BASE_URL}/auth/password/reset/verify`, { email, code });
};

export const changePassword = async (email, newPassword) => {
  return axios.post(`${API_BASE_URL}/auth/password/reset/change`, { email, newPassword });
};

// ✅ 구글 로그인 API 호출 → OAuth 페이지로 리디렉트
export const googleLogin = () => {
  window.location.href = `${API_BASE_URL}/oauth/authorize/google`;
};

// ✅ 카카오 로그인 API 호출 → OAuth 페이지로 리디렉트
export const kakaoLogin = () => {
  window.location.href = `${API_BASE_URL}/oauth/authorize/kakao`;
};

export const handleOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const refreshToken = urlParams.get("refreshToken");
  const email = urlParams.get("email");

  if (token && refreshToken && email) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("email", email);
    return { token, refreshToken, email };
  } else {
    throw new Error("OAuth 인증 후 토큰을 받지 못했습니다.");
  }
};

