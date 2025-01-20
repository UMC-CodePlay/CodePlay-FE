import React, { useState } from "react";
import likeButtonOff from "./assets/images/like_button_off.svg";
import likeButtonOn from "./assets/images/like_button_on.svg";

const Menu1 = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const trackData = [
    {
      title: "음원 제목입니다",
      date: "25.01.25",
      key: "C",
      scale: "Major",
      progression: "C-F-G-Am",
      bpm: "140",
    },
  ];

  const commonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "0 auto",
        paddingTop: "20px",
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          ...commonStyle,
          height: "0px",
          backgroundColor: "#EEEEEE",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#999",
        }}
      >
        <span style={{ flex: 3, textAlign: "left" }}>음원 목록</span>
        <span style={{ flex: 1, textAlign: "center" }}>키</span>
        <span style={{ flex: 1, textAlign: "center" }}>스케일</span>
        <span style={{ flex: 2, textAlign: "center" }}>코드 진행</span>
        <span style={{ flex: 1, textAlign: "center" }}>BPM</span>
        {/* 버튼 자리를 위한 빈 열 */}
        <span style={{ flex: 1, textAlign: "center" }}></span>
      </div>

      {/* 리스트 항목 */}
      <div
        style={{
          ...commonStyle,
          marginTop: "20px",
          height: "105px",
          backgroundColor: "#F9F8FA",
        }}
      >

      {/* 태그 */}
      <div
        style={{
          position: "relative",
          top: "40px",
          left: "-46px", // 리스트 항목의 왼쪽 경계 밖으로 이동
          transform: "translateY(-50%)", // 세로 방향 중앙 정렬
          backgroundColor: "#A89CFF", // 태그 배경색
          color: "#FFFFFF", // 텍스트 색상
          fontSize: "12px",
          fontWeight: "bold",
          padding: "10px 5px", // 태그 여백
          borderRadius: "8px 0 0 8px", // 왼쪽 상단과 하단만 둥글게
          writingMode: "vertical-rl", // 텍스트를 세로로 표시
          textAlign: "center", // 텍스트 중앙 정렬
          display: "flex", // Flexbox로 수직 중앙 정렬
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
        }}
      >
        세션 분리
      </div>

        {/* 음원 정보 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flex: 3,
          }}
        >
          <div
            style={{
              width: "84px",
              height: "84px",
              backgroundColor: "#D9D9D9",
              borderRadius: "8px",
            }}
          ></div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "16px", padding: "5px"}}>
              {trackData[0].title}
            </div>
            <div style={{ fontSize: "14px", color: "#666", padding: "5px"}}>
              {trackData[0].date}
            </div>
          </div>
        </div>

        {/* 키 */}
        <span style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "#000" }}>
          {trackData[0].key}
        </span>

        {/* 스케일 */}
        <span style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "#000" }}>
          {trackData[0].scale}
        </span>

        {/* 코드 진행 */}
        <span style={{ flex: 2, textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "#000" }}>
          {trackData[0].progression}
        </span>

        {/* BPM */}
        <span style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: "16px", color: "#000" }}>
          {trackData[0].bpm}
        </span>

        {/* 좋아요 버튼 */}
        <button
          onClick={toggleLike}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            flex: 1,
            textAlign: "center",
          }}
        >
          <img
            src={isLiked ? likeButtonOn : likeButtonOff}
            alt="좋아요 버튼"
            style={{
              width: "52px",
              height: "48px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Menu1;
