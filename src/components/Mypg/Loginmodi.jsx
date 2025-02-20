// Loginmodi.jsx
import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Savebutton from "../../assets/Mypg_img/Savebutton.svg";
import { AuthContext } from "../../context/AuthContext.jsx";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function Loginmodi() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // 🔹 프로필 이미지 관리
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ AuthContext에서 가져온 user.email이 없으면 localStorage에서 email을 가져옴
  //    둘 다 없으면 ""(빈 문자열)
  const displayedEmail = user?.email || localStorage.getItem("email") || "";

  // (1) 비밀번호 변경 로직 → PUT 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/member/update`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 주의: 백틱(`) 사용
          },
        },
      );

      if (response.data.isSuccess) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/mypage");
      } else {
        alert(`비밀번호 변경 실패: ${response.data.message}`);
      }
    } catch (err) {
      console.error("❌ 비밀번호 변경 에러:", err);
      alert("서버 오류로 인해 비밀번호 변경에 실패했습니다.");
    }
  };

  // (2) "이미지 업로드" 버튼 클릭 → 숨겨진 파일 입력 열기
  const handleImageUploadClick = () => {
    hiddenFileInput.current.click();
  };

  /**
   * (3) 파일 선택 → 2단계 업로드 방식 (POST로 presigned URL 받고, PUT으로 실제 업로드)
   */
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      // 1단계) presigned URL 요청 (POST)
      const presignRes = await axios.post(
        `${API_BASE_URL}/files/upload?fileType=IMAGE&fileName=${encodeURIComponent(file.name)}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            fileType: "IMAGE",
          },
        },
      );

      if (!presignRes.data.isSuccess) {
        alert(`Presigned URL 발급 실패: ${presignRes.data.message}`);
        return;
      }

      const uploadS3Url = presignRes.data.result.uploadS3Url;

      // 🛠️ 2단계: presigned URL로 파일 PUT 업로드
      const putResponse = await axios.put(uploadS3Url, file, {
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${token}`,
        },
      });

      if (putResponse.status === 200) {
        console.log("✅ 이미지 업로드 성공!");

        // 🛠️ 3단계: 이미지 GET 요청 (캐시 무력화)
        const cacheBustedUrl = `${uploadS3Url}?timestamp=${Date.now()}`;
        const getResponse = await axios.get(cacheBustedUrl, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🛠️ 4단계: Blob → 이미지 URL 변환
        const imageUrl = URL.createObjectURL(getResponse.data);
        setProfileImgUrl(imageUrl);

        alert("이미지 업로드 및 조회 성공!");
      } else {
        console.warn("⚠️ 이미지 업로드 실패:", putResponse.status);
      }
    } catch (err) {
      console.error("❌ 이미지 업로드 에러:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 4) 이미지 URL 해제
  const handleClearImage = () => {
    if (profileImgUrl) {
      URL.revokeObjectURL(profileImgUrl);
      setProfileImgUrl(null);
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
          <Input1 type="email" value={displayedEmail} readOnly />
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

/* ------------------- Styled Components ------------------- */

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
