// src/pages/Mypage/MPYsearch.jsx
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBar from "../../components/Mypg/SearchBarentire.jsx";
import Mypageser from "../../components/Mypg/MypageSERli.jsx";
import Menu from "../../components/Mypg/Menu.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

// 기존: import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

function MPYsearch() {
  const location = useLocation();
  const [harmonies, setHarmonies] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const musicTitle = searchParams.get("musicTitle");
    if (musicTitle) {
      axios
        .get(
          `http://15.164.219.98.nip.io/member/mypage/search?musicTitle=${encodeURIComponent(
            musicTitle
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.isSuccess) {
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
  }, [location.search, token]);

  return (
    <div>
      <ConditionalNavbar />
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

        {/* 검색 결과 */}
        <div style={{ marginTop: "20px" }}>
          <Mypageser harmonies={harmonies} tracks={tracks} />
        </div>
      </div>
    </div>
  );
}

export default MPYsearch;
