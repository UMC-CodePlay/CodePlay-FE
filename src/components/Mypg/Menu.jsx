import { Link } from 'react-router-dom';
import styled from "styled-components";



const Menu = () => {
  return (
    <div
      style={{  
        width: "100%", // 메뉴가 화면 너비에 맞춤
        borderBottom: "2px solid #E4E1E7", // 아래쪽 구분선
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px 0", // 위아래 패딩
        backgroundColor: "transparent", // 배경 없음

      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "75px", // 메뉴 항목 간 간격
          fontSize: "20px", // 폰트 크기
          color: "#4B4B4B", // 텍스트 색상
          textAlign: "center",
        }}  
      >
        <span style={{ cursor: "pointer" }}><StyledLink to="/mypageharmony">화성 분석 결과</StyledLink></span>
        <span style={{ cursor: "pointer" }}><StyledLink to="/mypagesession">분리된 세션</StyledLink></span>
      </div>
    </div>
  );
};

export default Menu;

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모의 색상 상속 */
  &:hover {
    color: inherit; /* 호버 시에도 색상 변화 없음 */
    text-decoration: none; /* 호버 시 밑줄 제거 유지 */
  }
`;

