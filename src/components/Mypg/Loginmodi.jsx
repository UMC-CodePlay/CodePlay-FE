// Loginmodi.jsx
import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Savebutton from "../../assets/Mypg_img/Savebutton.svg";
import { AuthContext } from "../../context/AuthContext.jsx";

function Loginmodi() {
  // --- 비밀번호 변경 상태 ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // ★ 프로필 이미지 업로드 관련 상태
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const hiddenFileInput = useRef(null);

  // AuthContext에서 토큰과 user 정보를 가져옴
  const { token, user } = useContext(AuthContext);

  const navigate = useNavigate();

  // 1) 비밀번호 변경 로직
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        "http://15.164.219.98.nip.io/member/update",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/mypage");
      } else {
        alert(`비밀번호 변경 실패: ${data.message}`);
      }
    } catch (err) {
      console.error("PUT 요청 에러:", err);
      alert("서버 오류로 인해 비밀번호 변경에 실패했습니다.");
    }
  };

  // 2) "이미지 업로드" 버튼 클릭 → 숨겨진 파일 입력 열기
  const handleImageUploadClick = () => {
    hiddenFileInput.current.click();
  };

  /**
   * 3) 파일 선택 → 2단계 업로드 방식 (POST로 presigned URL 받고, PUT으로 실제 업로드)
   */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1단계) presigned URL 요청
      const presignRes = await axios.post(
        `http://15.164.219.98.nip.io/files/upload?fileType=IMAGE&fileName=${encodeURIComponent(file.name)}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!presignRes.data.isSuccess) {
        alert(`presigned URL 발급 실패: ${presignRes.data.message}`);
        return;
      }

      // 서버 응답에서 S3 presigned URL 획득
      const uploadS3Url = presignRes.data.result.uploadS3Url;

      // 2단계) PUT presigned URL로 실제 파일 업로드
      await axios.put(uploadS3Url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // 업로드 성공 후, 해당 URL을 프로필 이미지 경로로 사용
      setProfileImgUrl(uploadS3Url);
      alert("이미지 업로드 성공");
    } catch (err) {
      console.error("이미지 업로드 에러:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageContainer>
      <FormCard onSubmit={handleSubmit}>
        <ProfileWrapper>
          {/* 프로필 이미지 미리보기 → background-image */}
          <ProfileIcon profileImgUrl={profileImgUrl} />

          <UploadButton type="button" onClick={handleImageUploadClick}>
            이미지 업로드
          </UploadButton>

          {/* 숨겨진 파일 입력 */}
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </ProfileWrapper>

        {/* 이메일 (읽기 전용) */}
        <Label>이메일</Label>
        <FieldContainer>
          <Input1
            type="email"
            value={user?.email || ""}
            readOnly
          />
        </FieldContainer>

        {/* 현재 비밀번호 */}
        <Label>현재 비밀번호</Label>
        <FieldContainer>
          <Input
            type="password"
            placeholder="현재 비밀번호를 입력하세요."
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FieldContainer>

        {/* 새 비밀번호 */}
        <Label>새 비밀번호</Label>
        <FieldContainer>
          <Input
            type="password"
            placeholder="새 비밀번호를 입력하세요."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FieldContainer>

        {/* 새 비밀번호 확인 */}
        <Label>새 비밀번호 확인</Label>
        <FieldContainer>
          <Input
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요."
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </FieldContainer>

        {/* 저장하기 버튼 (SVG 이미지를 클릭하면 폼이 submit됨) */}
        <SaveButtonWrapper>
          <button
            type="submit"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src={Savebutton}
              alt="저장하기 버튼"
              style={{ width: "100%", maxWidth: "120px" }}
            />
          </button>
        </SaveButtonWrapper>
      </FormCard>
    </PageContainer>
  );
}

export default Loginmodi;

const PageContainer = styled.div`
  width: 100%;
  background-color: #f9f9f9;
    min-height: 84vh; /* 뷰포트 전체 높이 */

  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`;

const FormCard = styled.form`
  background-color: #ffffff;
  width: 600px;
      min-height: 76vh; /* 뷰포트 전체 높이 */

  margin: 0;
  padding: 40px 30px;
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
  border-radius: 50%;
  background-color: #ccc;
  background-image: url(${(props) => props.profileImgUrl || ""});
  background-size: cover;
  background-position: center;
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
    background-color: #f3eafb;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 75%;
  text-align: left;
  &:focus {
    outline: none;
    border-color: #6c33e9;
  }
`;

const Input1 = styled.input`
  height: 45px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 14px;
  width: 75%;
  text-align: left;
  /* 배경을 약간 투명하게 하여 뒤의 요소가 살짝 보이도록 */
  background-color: rgba(249, 248, 250, 0.8);
  /* 배경만 흐리게 처리 (텍스트는 흐려지지 않음) */
  backdrop-filter: blur(3px);
  /* 텍스트는 선명하게, 약간 덮이는 느낌을 주려면 RGBA 색상 사용 */
  color: rgba(182, 175, 190, 1);
  &:focus {
    outline: none;
    border-color: #6c33e9;
  }
`;

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
