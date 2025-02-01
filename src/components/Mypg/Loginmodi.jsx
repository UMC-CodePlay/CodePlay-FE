// Loginmodi.jsx
import React from "react";
import styled from "styled-components";
import Savebutton from "../../assets/Mypg_img/Savebutton.svg";

function Loginmodi() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 저장하기 버튼 클릭 시의 처리 로직
  };

  return (
    <PageContainer>
      {/* 흰색 박스(카드) 영역 */}
      <FormCard onSubmit={handleSubmit}>
        <ProfileWrapper>
          <ProfileIcon />
          <UploadButton type="button">이미지 업로드</UploadButton>
        </ProfileWrapper>

        <Label>이메일</Label>
        <FieldContainer>
          <Input type="email" value="codeplay123@gmail.com" readOnly />
        </FieldContainer>

        <Label>현재 비밀번호</Label>
        <FieldContainer>
          <Input type="password" placeholder="플레이스 홀더" />
        </FieldContainer>

        <Label>새 비밀번호</Label>
        <FieldContainer>
          <Input type="password" placeholder="플레이스 홀더" />
        </FieldContainer>

        <Label>새 비밀번호 확인</Label>
        <FieldContainer>
          <Input type="password" placeholder="플레이스 홀더" />
        </FieldContainer>

        {/* SVG 파일을 이미지로 사용 */}
        <SaveButtonWrapper>
          <img src={Savebutton} alt="저장하기 버튼" />
        </SaveButtonWrapper>
      </FormCard>
    </PageContainer>
  );
}

export default Loginmodi;

/* ------------------- styled-components -------------------- */

const PageContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9; /* 좌우 배경색 */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단부터 배치 */
  margin: 0; /* 여백 제거 */
  padding: 0; /* 패딩 제거 */
`;

const FormCard = styled.form`
  background-color: #ffffff;
  width: 600px; /* 원하는 카드 폭 */
  margin: 0; /* 상단 여백 제거 */
  padding: 40px 30px; /* 카드 내부 여백 */
  display: flex;
  flex-direction: column;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ccc; /* 회색 원 */
  border-radius: 50%;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  background-color: #fff;
  color: #6c33e9;
  border: 2px solid #6c33e9;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f3eafb; /* 연한 보라색 느낌 */
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-weight: bold;
  color: #000;
  transform: translateX(70px);
  font-size: 13px;
`;

const Input = styled.input`
  height: 45px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 14px;
  width: 75%; /* 입력 필드의 폭 조정 */
  text-align: left; /* 입력 내용 왼쪽 정렬 */
  &:focus {
    outline: none;
    border-color: #6c33e9;
  }
`;

/* SVG를 감싸는 래퍼 스타일 */
const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    cursor: pointer;
    width: 100%; /* 버튼 크기 조정 */
    max-width: 120px; /* 최대 너비 제한 */
  }

  img:hover {
    opacity: 0.8; /* 호버 시 약간 투명 */
  }
`;
