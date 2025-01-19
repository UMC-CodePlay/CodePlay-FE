import React, { useState } from "react";

const Menu3 = () => {
  const [activeButton, setActiveButton] = useState("전체"); // 초기 활성 버튼 설정

  const buttons = ["전체", "키보드", "기타", "드럼", "베이스"];

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "20px auto", // 메뉴바 아래에 적당한 여백
        display: "flex",
        justifyContent: "center", // 버튼을 중앙 정렬
        gap: "15px", // 버튼 간 간격
      }}
    >
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => handleButtonClick(button)}
          style={{
            padding: "10px 20px", // 버튼 크기 조정
            backgroundColor: "#FFFFFF", // 모든 버튼의 배경색은 흰색
            border: `2px solid ${
              activeButton === button ? "#6F3DA1" : "#C9C3CE"
            }`, // 활성 버튼은 보라색, 비활성 버튼은 회색
            borderRadius: "9999px", // 버튼을 완전한 반원으로 설정
            fontSize: "16px", // 폰트 크기를 적절히 설정
            fontWeight: "bold",
            color: activeButton === button ? "#000000" : "#C9C3CE", // 활성 버튼은 검정색, 비활성 버튼은 회색
            cursor: "pointer",
            transition: "all 0.3s ease", // 부드러운 스타일 전환 효과
          }}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Menu3;
