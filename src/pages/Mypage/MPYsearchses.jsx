// MPYsearchses.jsx
import React, { useEffect, useState, useContext} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";


import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBarses from "../../components/Mypg/SearchBarses.jsx";
import Menu2ses from "../../components/Mypg/Menu2ses.jsx";
import Menu4 from "../../components/Mypg/Menusearch.jsx";
import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

function Mypagehold() {
  const location = useLocation();
  const [trackList, setTrackList] = useState([]);

  const { token } = useContext(AuthContext);


  useEffect(() => {
    // 쿼리 파라미터에서 musicTitle 추출
    const searchParams = new URLSearchParams(location.search);
    const musicTitle = searchParams.get("musicTitle");

    if (musicTitle) {
      // API 요청
      axios
        .get(
          `http://15.164.219.98.nip.io/member/mypage/track/search?musicTitle=${encodeURIComponent(
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
            // 응답 배열: res.data.result (각 item = {trackId, musicId, ...})
            setTrackList(res.data.result || []);
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
          <SearchBarses />
        </div>

        {/* 상단 메뉴 */}
        <div style={{ marginTop: "20px" }}>
          <Menu4 />
        </div>

        {/* 실제 검색 결과 */}
        <div style={{ marginTop: "20px" }}>
          <Menu2ses trackList={trackList} />
        </div>
      </div>
    </div>
  );
}

export default Mypagehold;
