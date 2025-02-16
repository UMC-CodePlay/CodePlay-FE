import React, { useState, createContext, useContext } from "react";
import styled from "styled-components";
import FileHarmony from "../assets/FileHarmony.svg";
import FileSelectButton from "../components/Buttons/FileSelectButton";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const UploadHarmony = () => {
  const [taskId, setTaskId] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // 🔹 파일 선택 시 호출되는 함수 (UploadHarmony로 이동)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. 파일 타입 검증
    if (file.type !== "audio/mpeg") {
      alert("mp3 파일만 업로드할 수 있습니다.");
      return;
    }

    // 2. 파일 크기 검증 (10MB 이하)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하로 업로드해 주세요.");
      return;
    }

    // 3. 파일 검증 통과 시 서버에 파일 업로드 요청
    fetchUpload(file);
  };

  // 🔹 서버에 POST 요청하여 S3 URL 가져오는 함수
  const fetchUpload = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "AUDIO");

      // 🔹 1. S3 URL 요청
      const response = await axios.post(
        `${API_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { uploadS3Url, musicId } = response.data.result;
      console.log("🚀 S3 URL 응답:", response.data);

      // 🔹 2. S3에 파일 업로드
      if (uploadS3Url) {
        await uploadFileToS3(uploadS3Url, file);
      }

      // 🔹 3. 파일 정보 저장
      const uploadedFileInfo = {
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        musicId: musicId,
      };
      localStorage.setItem("uploadedFile", JSON.stringify(uploadedFileInfo));

      // 🔹 4. Harmony 작업 요청
      const harmonyResponse = await requestHarmony(musicId);
      const { taskId } = harmonyResponse.data.result;

      // 🔹 5. taskId 저장
      const resultInfo = { ...uploadedFileInfo, taskId };
      localStorage.setItem("uploadedFile", JSON.stringify(resultInfo));
    } catch (error) {
      console.error("❌ API 호출 오류:", error.response?.data || error.message);
      setError(error.message);
    }
  };

  // 🔹 S3 URL로 PUT 요청하여 파일 업로드
  const uploadFileToS3 = async (s3Url, file) => {
    try {
      const fileBuffer = await file.arrayBuffer();
      const response = await axios.put(s3Url, fileBuffer, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        console.log("✅ S3 파일 업로드 성공!");
        alert("파일 업로드가 완료되었습니다!");

        const musicId = response.data?.musicId;
        requestHarmony(musicId);
      } else {
        console.warn("⚠️ S3 업로드 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("❌ S3 업로드 오류:", error.message);
      alert("S3 업로드 중 오류 발생!");
    }
  };

  const requestHarmony = async (musicId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/task/harmony`,
        { musicId }, // body에 musicId 전달
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        console.log("🎶 Harmony 요청 성공:", response.data);
        alert("Harmony 작업이 성공적으로 완료되었습니다!");
      } else {
        console.warn("⚠️ Harmony 요청 실패 - 상태 코드:", response.status);
      }
    } catch (error) {
      console.error("❌ Harmony 요청 오류:", error.message);
    }
  };

  // 🔹 드래그 이벤트 핸들러
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

  // 🔹 파일 업로드 진행 시 progress-bar 표시
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
    <>
      <UploadContainer
        data-drag-over={isDragOver}
        $isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploading ? (
          <UploadingBox>
            <UploadingText>파일 업로드 중...</UploadingText>
            <SubText>
              선택한 파일을 인식하고 있어요. 조금만 기다려주세요!
            </SubText>
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
    </>
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
