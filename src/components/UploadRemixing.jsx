import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FileHarmony from "../assets/FileHarmony.svg";
import FileSelectButton from "../components/Buttons/FileSelectButton";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const UploadRemixing = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const renamedFile = renameFile(file);
    if (file.type !== "audio/mpeg") {
      alert("mp3 파일만 업로드할 수 있습니다.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하로 업로드해 주세요.");
      return;
    }

    fetchUpload(renamedFile);
  };

  const fetchUpload = async (file) => {
    try {
      console.log("📤 fetchUpload 함수 실행됨");
      console.log("🎵 업로드 파일:", file.name, file.size);

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
      console.log("🚀 S3 URL 응답:", response.data.result.uploadS3Url);
      console.log("musciId:", response.data.result.musicId);

      if (s3Url && musicId) {
        await uploadFileToS3(s3Url, file);
        console.log("📡 uploadFileToS3 호출됨");

        await requestRemixing(musicId);
        console.log("requestRemixing 호출됨");
      } else {
        console.warn("⚠️ S3 URL을 받지 못함");
      }
    } catch (error) {
      console.error("❌ API 호출 오류:", error.response?.data || error.message);
      setError(error.message);
    }
  };

  const uploadFileToS3 = async (s3Url, file) => {
    console.log("✅ 업로드 대상 S3 URL:", s3Url);
    console.log("🎵 업로드 파일:", file.name, file.size);

    try {
      const response = await axios.put(s3Url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("📡 S3 응답 상태 코드:", response.status);

      if (response.status === 200) {
        alert("파일 업로드가 완료되었습니다!");
      } else {
        console.warn("⚠️ S3 업로드 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      alert("S3 업로드 중 오류 발생!");
    }
  };

  const requestRemixing = async (musicId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/task/remix`,
        {
          musicId: musicId,
          scaleModulation: 12,
          tempoRatio: 4,
          reverbAmount: 1,
          isChorusOn: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        console.log("🎶 Remixing 요청 성공:", response.data);
        alert("Remixing 작업이 성공적으로 완료되었습니다!");
      } else {
        console.warn("⚠️ Remixing 요청 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("❌ Remixing 요청 오류:", error.message);
    }
  };

  const renameFile = (file) => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timePrefix = `${hours}${minutes}`;
    const newFileName = `${timePrefix}-${file.name}`;

    // 🔹 Blob을 사용하여 새 File 생성
    const blob = new Blob([file], { type: file.type });
    const renamedFile = new File([blob], newFileName, { type: file.type });

    console.log(`🕒 변경된 파일명: ${renamedFile.name}`);
    return renamedFile;
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
      fetchUpload(file);
    }
  };

  return (
    <UploadContainer
      $isDragOver={isDragOver}
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
            <UploadText>
              이곳에 분석하고 싶은 음원 파일을 업로드하세요
            </UploadText>
            <SubText>최대 10MB, mp3 파일 지원</SubText>
            <FileSelectButton
              onClick={() => document.getElementById("file-upload").click()}
            />
          </TextButtonContainer>

          <HiddenFileInput
            type="file"
            id="file-upload"
            onChange={handleFileChange}
          />
        </>
      )}
    </UploadContainer>
  );
};

export default UploadRemixing;

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
