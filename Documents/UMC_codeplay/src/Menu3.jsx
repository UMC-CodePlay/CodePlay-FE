import React, { useState } from "react";
import likeButtonOff from "./assets/images/like_button_off.svg";
import likeButtonOn from "./assets/images/like_button_on.svg";

const Menu3 = () => {
  const [likes, setLikes] = useState([false, false, false, false]); // 좋아요 상태 관리

  const toggleLike = (index) => {
    setLikes((prev) =>
      prev.map((liked, i) => (i === index ? !liked : liked))
    );
  };

  const files = [
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
    { title: "파일 제목이 들어갈 예정임.....", date: "작업 일시" },
  ];

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      {/* 카드를 감싸는 컨테이너 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              width: "248px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 이미지 영역 */}
            <div
              style={{
                width: "248px",
                height: "352px",
                backgroundColor: "#D9D9D9",
                position: "relative",
              }}
            >
              {/* 좋아요 버튼 */}
              <button
                onClick={() => toggleLike(index)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  src={likes[index] ? likeButtonOn : likeButtonOff}
                  alt="좋아요 버튼"
                  style={{
                    width: "52px",
                    height: "48px",
                  }}
                />
              </button>
            </div>
  
            {/* 제목과 작업 일시 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%", // 부모 크기에 맞춤
              }}
            >
              {/* 제목 */}
              <div
                style={{
                  padding: "10px 10px 10px 0", // 내부 여백
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                {file.title}
              </div>
  
              {/* 작업 일시 */}
              <div
                style={{
                  padding: "10px 10px 10px 0", // 내부 여백
                  fontSize: "12px",
                  color: "#999",
                  textAlign: "left",
                }}
              >
                {file.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Menu3;
