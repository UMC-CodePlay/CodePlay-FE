import styled from "styled-components";
import PersonIcon from "../../assets/Mypg_img/person.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: white;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  padding: 0px 0px 40px 0px;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 15px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
`;

const EditProfile = styled(Link)`
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: normal;
  color: #888;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

function MyPageBar() {
  // AuthContext에서 user를 가져옴
  const { user } = useContext(AuthContext);
  
  // AuthContext의 user가 null일 경우를 대비해 localStorage에서 email을 가져옴
  const storedEmail = localStorage.getItem("email");

  // user.email이 있다면 그걸 쓰고, 없으면 storedEmail을 쓰고, 둘 다 없으면 "로그인 필요" 표시
  const displayedEmail = user?.email || storedEmail || "로그인 필요";

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src={PersonIcon} alt="프로필 아이콘" />
        <ProfileInfo>
          <ProfileName>
            {displayedEmail}
          </ProfileName>
          <EditProfile to="/mypage/mypageinfo">회원정보 수정</EditProfile>
        </ProfileInfo>
      </ProfileHeader>
    </Container>
  );
}

export default MyPageBar;
