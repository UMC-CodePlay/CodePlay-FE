// src/components/UploadHarmony.jsx
import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import FileHarmony from "../assets/FileHarmony.svg";
import FileSelectButton from "../components/Buttons/FileSelectButton";
import { AuthContext } from "../context/AuthContext";

const UploadHarmony = ({ onUploadSuccess }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // AuthContext에서 토큰 가져오기, 없으면 localStorage에서 가져오기
  const { token: contextToken } = useContext(AuthContext);
  const token = contextToken || localStorage.getItem("token");
  console.log("UploadHarmony - 토큰:", token);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      startUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      startUpload(file);
    }
  };

  // 파일 업로드 (프리사인 URL 요청 → S3 업로드)
  const startUpload = async (file) => {
    if (!token) {
      setMessage("토큰이 없으므로 파일 업로드를 진행할 수 없습니다.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setMessage("");

    try {
      const fileType = file.type.startsWith("image") ? "IMAGE" : "AUDIO";
      const fileName = file.name;

      setMessage("프리사인 URL 요청 중...");
      const presignedResponse = await axios.post(
        `http://15.164.219.98.nip.io/files/upload`,
        null,
        {
          params: { fileType, fileName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (presignedResponse.data && presignedResponse.data.isSuccess) {
        const { uploadS3Url, musicId } = presignedResponse.data.result;
        setMessage("S3에 파일 업로드 중...");
        await axios.put(uploadS3Url, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        });
        setProgress(100);
        setMessage(`파일 업로드 성공! 생성된 musicId: ${musicId}`);
        // 부모 컴포넌트로 musicId 전달
        if (onUploadSuccess) {
          onUploadSuccess(musicId);
        }
      } else {
        throw new Error("프리사인 URL 요청 실패");
      }
    } catch (error) {
      console.error("업로드 에러:", error);
      setMessage("업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer
      isDragOver={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {uploading ? (
        <UploadingBox>
          <UploadingText>파일 업로드 중...</UploadingText>
          <SubText>{message}</SubText>
          <ProgressBarContainer>
            <ProgressBar style={{ width: `${progress}%` }} />
          </ProgressBarContainer>
          <ProgressText>{progress}%</ProgressText>
        </UploadingBox>
      ) : (
        <>
          <IconContainer>
            <Icon src={FileHarmony} alt="Upload Icon" />
          </IconContainer>
          <TextButtonContainer>
            <UploadText>이곳에 분석하고 싶은 음원 파일을 업로드하세요</UploadText>
            <SubText>최대 10MB, WAV 파일 지원</SubText>
            <FileSelectButton onClick={() => document.getElementById("file-upload").click()} />
          </TextButtonContainer>
          <HiddenFileInput type="file" id="file-upload" onChange={handleFileSelect} />
        </>
      )}
    </UploadContainer>
  );
};

export default UploadHarmony;

const UploadContainer = styled.div`
  width: 805px;
  height: 217px;
  position: relative;
  background: rgba(28, 28, 38, 0.4);
  backdrop-filter: blur(137.73px);
  border-radius: 12px;
  border: 3px dashed rgb(129, 128, 130);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
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

const UploadingBox = styled.div`
  width: 805px;
  height: 217px;
  background: #f4f4f4;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const UploadingText = styled.p`
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #333;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  margin: 10px 0;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #6f3da1 0%, #7185e1 100%);
  transition: width 0.5s ease;
`;

const ProgressText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;
