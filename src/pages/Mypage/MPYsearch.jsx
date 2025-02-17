// MPYsearch.jsx
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBar from "../../components/Mypg/SearchBarentire.jsx";
import Mypageser from "../../components/Mypg/MypageSERli.jsx";
import Menu from "../../components/Mypg/Menu.jsx";
import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

function Mypagehold() {
  const location = useLocation();
  const [harmonies, setHarmonies] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { token } = useContext(AuthContext);
  

  useEffect(() => {
    // 1) 쿼리 파라미터에서 musicTitle 추출
    const searchParams = new URLSearchParams(location.search);
    const musicTitle = searchParams.get("musicTitle");

    // 2) API 호출
    if (musicTitle) {
      axios
        .get(
          `http://15.164.219.98.nip.io/member/mypage/search?musicTitle=${encodeURIComponent(
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
            // result.harmonies, result.tracks
            const result = res.data.result;
            setHarmonies(result.harmonies || []);
            setTracks(result.tracks || []);
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
          <SearchBar />
        </div>

        {/* 상단 메뉴 */}
        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <Menu />
        </div>

        {/* 검색 결과 표시 (harmonies, tracks) */}
        <div style={{ marginTop: "20px" }}>
          {/* MypageSERli.jsx에 두 배열을 props로 넘김 */}
          <Mypageser harmonies={harmonies} tracks={tracks} />
        </div>
      </div>
    </div>
  );
}

export default Mypagehold;
