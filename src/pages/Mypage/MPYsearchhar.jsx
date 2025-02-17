// src/pages/Mypage/MPYsearchhar.jsx
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

import Introduce from "../../components/Mypg/Introduce.jsx";
import SearchBarhar from "../../components/Mypg/SearchBarhar.jsx";
import Menu1har from "../../components/Mypg/Menu1har.jsx";
import Menu4 from "../../components/Mypg/Menusearch.jsx";
import Mypageletter from "../../components/Mypg/Mypageletter.jsx";

// 기존: import NavbarLog from "../../components/Mypg/NavbarLog.jsx";
import ConditionalNavbar from "../../components/ConditionalNavbar";

function MPYsearchhar() {
  const location = useLocation();
  const [resultData, setResultData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const musicTitle = searchParams.get("musicTitle");
    if (musicTitle) {
      axios
        .get(
          `http://15.164.219.98.nip.io/member/mypage/harmony/search?musicTitle=${encodeURIComponent(
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
            setResultData(res.data.result);
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

        <div style={{ borderBottom: "1px solid #E4E1E7" }}>
          <SearchBarhar />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Menu4 />
        </div>

        <div style={{ marginTop: "20px" }}>
          <Menu1har trackList={resultData} />
        </div>
      </div>
    </div>
  );
}

export default MPYsearchhar;
