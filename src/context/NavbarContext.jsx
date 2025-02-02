import { createContext, useContext, useState } from "react";

// Context 생성
const NavbarContext = createContext();

// Context Provider 컴포넌트 생성
export const NavbarProvider = ({ children }) => {
  const [isNavbar1, setIsNavbar1] = useState(false);

  // 로그인 시 Navbar를 변경하는 함수
  const toggleNavbar = () => {
    setIsNavbar1(true);
  };

  // 로그아웃 시 Navbar를 원래대로 변경하는 함수
  const resetNavbar = () => {
    setIsNavbar1(false);
  };

  return (
    <NavbarContext.Provider value={{ isNavbar1, toggleNavbar, resetNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Context 사용을 위한 커스텀 훅 생성
export const useNavbar = () => useContext(NavbarContext);
