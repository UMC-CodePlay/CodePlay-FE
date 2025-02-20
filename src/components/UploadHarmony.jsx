import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FileHarmony from "../assets/FileHarmony.svg";
import FileSelectButton from "./Buttons/FileSelectButton";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const UploadHarmony = ({ setIsUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "audio/mpeg") {
      alert("MP3 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하로 업로드해 주세요.");
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file) => {
    try {
      console.log("업로드 시작:", file.name);
      setUploading(true);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/files/upload?fileType=AUDIO&fileName=${file.name}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const s3Url = response.data.result.uploadS3Url;
      const musicId = response.data.result.musicId;

      if (s3Url && musicId) {
        await uploadToS3(s3Url, file);
        await requestHarmony(musicId);
      } else {
        console.warn("S3 URL없음");
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error.response?.data || error.message);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadToS3 = async (s3Url, file) => {
    try {
      const response = await axios.put(s3Url, file, {
        headers: { "Content-Type": file.type },
      });

      if (response.status === 200) {
        console.log("S3 업로드 완료!");
      } else {
        console.warn("S3 업로드 실패:", response.status);
      }
    } catch (error) {
      console.error("S3 업로드 오류:", error.message);
    }
  };

  const requestHarmony = async (musicId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/task/harmony`,
        { musicId: musicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const taskId = response.data.result.taskId;
        console.log("🎶 Harmony 요청 성공, Task ID:", taskId);
        localStorage.setItem("taskId", taskId); // ✅ taskId 저장
        setIsUploading(true); // ✅ 업로드 완료 후 상태 업데이트
      } else {
        console.warn("Harmony 요청 실패:", response.status);
      }
    } catch (error) {
      console.error("Harmony 요청 오류:", error.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <UploadWrapper>
      <UploadContainer
        $isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <IconContainer>
          <Icon src={FileHarmony} alt="Upload Icon" />
        </IconContainer>

        <TextButtonContainer>
          <UploadText>이곳에 분석하고 싶은 음원 파일을 업로드하세요</UploadText>
          <SubText>최대 10MB, MP3 파일 지원</SubText>
          <FileSelectButton
            onClick={() => document.getElementById("file-upload").click()}
          />
        </TextButtonContainer>

        <HiddenFileInput
          type="file"
          id="file-upload"
          onChange={handleFileChange}
        />
      </UploadContainer>
    </UploadWrapper>
  );
};

export default UploadHarmony;

// ✅ 스타일 적용
const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

const UploadContainer = styled.div`
  width: 805px;
  height: 217px;
  position: relative;
  background: rgba(28, 28, 38, 0.4);
  backdrop-filter: blur(137.73px);
  border-radius: 12px;
  border: 3px dashed
    ${({ $isDragOver }) => ($isDragOver ? "white" : "rgb(129, 128, 130)")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.1s ease-in-out;
`;

const IconContainer = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -50px;
`;

const Icon = styled.img`
  width: 145px;
  height: 145px;
`;

const TextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const UploadText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 28.64px;
  text-align: left;
  color: white;
`;

const SubText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #bbb;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
