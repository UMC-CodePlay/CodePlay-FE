import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, refreshToken } from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem("refreshToken") || null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    setUser(null);
    setToken(null);
    setRefreshTokenValue(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const storedEmail = localStorage.getItem("email");
      if (refreshTokenValue && storedEmail) {
        try {
          const data = await refreshToken(storedEmail, refreshTokenValue);
          setToken(data.result.token);
          setRefreshTokenValue(data.result.refreshToken);
          localStorage.setItem("token", data.result.token);
          localStorage.setItem("refreshToken", data.result.refreshToken);
        } catch (error) {
          console.error("토큰 갱신 실패. 로그아웃 처리됨.", error);
          logout();
        }
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshTokenValue, logout]);

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
