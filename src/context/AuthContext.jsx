import { createContext, useState, useEffect } from "react";
import { login, refreshToken } from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem("refreshToken") || null);

  useEffect(() => {
    if (token) {
      setUser({ email: localStorage.getItem("email") });
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (refreshTokenValue) {
        try {
          const data = await refreshToken(localStorage.getItem("email"), refreshTokenValue);
          setToken(data.result.token);
          setRefreshTokenValue(data.result.refreshToken);
          localStorage.setItem("token", data.result.token);
          localStorage.setItem("refreshToken", data.result.refreshToken);
        } catch (error) {
          console.error("🔴 토큰 갱신 실패. 로그아웃 처리됨.");
          logout();
        }
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshTokenValue]);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser({ email });
      setToken(data.result.token);
      setRefreshTokenValue(data.result.refreshToken);
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("refreshToken", data.result.refreshToken);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("로그인 실패:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    setUser(null);
    setToken(null);
    setRefreshTokenValue(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
