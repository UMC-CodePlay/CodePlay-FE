import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FileHarmony from "../assets/FileHarmony.svg";
import FileSelectButton from "../components/Buttons/FileSelectButton";

const UploadHarmony = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
      startUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      startUpload(file);
    }
  };

  const startUpload = (file) => {
    setUploadedFile(file);
    setUploading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
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
          <SubText>선택한 파일을 인식하고 있어요. 조금만 기다려주세요!</SubText>
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

//업로딩중
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
