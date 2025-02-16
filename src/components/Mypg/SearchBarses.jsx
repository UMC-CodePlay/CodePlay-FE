// SearchBarses.jsx
import { useState } from "react";
import searchButtonIcon from "../../assets/Mypg_img/search_button.svg";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("검색어:", query);
    // 실제 이동은 Link로 처리
  };

  return (
    <div
      style={{
        width: "100%",
        height: "120px",
        backgroundColor: "#F9F9F9",
        borderTop: "2px solid #E4E1E7",
        borderBottom: "2px solid #E4E1E7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* 검색창 */}
        <input
          type="text"
          placeholder="검색어"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "665px",
            height: "56px",
            padding: "0 20px",
            borderRadius: "28px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
            color: "#000",
          }}
        />

        {/* 검색 버튼 (Link에 쿼리 파라미터로 musicTitle을 포함) */}
        <button
          type="submit"
          style={{
            width: "109px",
            height: "49px",
            marginLeft: "10px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={`/mypage/mypagesession/mypagesearchses?musicTitle=${encodeURIComponent(query)}`}>
            <img
              src={searchButtonIcon}
              alt="검색 버튼"
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
