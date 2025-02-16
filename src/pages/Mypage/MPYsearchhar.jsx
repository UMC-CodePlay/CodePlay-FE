// MPYsearchhar.jsx
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";


import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBarhar from "../../components/Mypg/SearchBarhar.jsx";
import Menu1har from "../../components/Mypg/Menu1har.jsx";
import Menu4 from "../../components/Mypg/Menusearch.jsx";
import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

function Mypagehold() {
  const location = useLocation();
  const [resultData, setResultData] = useState([]);
  const { token } = useContext(AuthContext);
  

  useEffect(() => {
    // URLSearchParams로 쿼리 파라미터 꺼내기
    const searchParams = new URLSearchParams(location.search);
    const musicTitle = searchParams.get("musicTitle"); // ?musicTitle=값

    if (musicTitle) {
      // API 호출
      axios
        .get(
          `http://15.164.219.98.nip.io/member/mypage/harmony/search?musicTitle=${encodeURIComponent(
            musicTitle
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ← 토큰 추가
            },
          }
          
          
        )
        .then((res) => {
          if (res.data.isSuccess) {
            setResultData(res.data.result); // 응답 배열 저장
          } else {
            console.error("API 요청 실패:", res.data.message);
          }
        })
        .catch((err) => {
          console.error("API 에러:", err);
        });
    }
  }, [location.search,token]);

  return (
    <div>
      <NavbarLog />
      <Mypageletter />
      <div style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <Introduce />

        {/* 검색 바 */}
        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <SearchBarhar />
        </div>

        {/* 상단 메뉴 (버튼들) */}
        <div style={{ marginTop: "20px" }}>
          <Menu4 />
        </div>

        {/* 실제 검색 결과 리스트 */}
        <div style={{ marginTop: "20px" }}>
          {/* Menu1har에 props로 넘김 */}
          <Menu1har trackList={resultData} />
        </div>
      </div>
    </div>
  );
}

export default Mypagehold;
