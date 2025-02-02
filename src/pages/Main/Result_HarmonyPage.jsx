import styled from "styled-components";
import React, { useState } from "react";
import "../../components/2screen/harmony.css";
import Logo from "../../assets/Logo_img/logo_bk_white.svg";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import "../../components/Buttons/SecondaryButton.css";
import Othersystems from "../../components/Othersystems";
import "../../components/Buttons/TertiaryWhiteButton.css";
import "../../components/Buttons/TertiaryBlackButton.css";
import "../../components/Buttons/PrimaryButton.css";
import { Link } from "react-router-dom";
import Slick from "../../components/Slick";
import ResultHarmonyButton from "../../components/Buttons/ResultHarmonyButton";
import PrevPurpleButton from "../../components/Buttons/PrevPurpleButton";
import PurpleButton from "../../components/Buttons/PurpleButton";

const Result_HarmonyPage = () => {
  const [pcikButton, setPickButton] = useState(0);
  return (
    <>
      <Navbar />
      <TitleNavbar
        title="화상 분석 결과"
        subtitle="어쩌고저쩌고 그냥 그런 내용들"
      ></TitleNavbar>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadBox fileName="이름" fileDetails="재생 시간 / 용량" />
      </div>

      <Slick></Slick>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          fontFamily: "Pretentard",
          gap: "70px",
        }}
      >
      <PrevPurpleButton>
        <Link to="/harmony">
          이전으로
        </Link>
      </PrevPurpleButton>

      <StyledPurpleButton>
        <Link to="/">
          다운로드
        </Link>
      </StyledPurpleButton>
      </div>
      <Othersystems></Othersystems>
    </>
  );
};

export default Result_HarmonyPage;

const StyledPurpleButton = styled(PurpleButton)`
  width: 160px;
  height: 59px;
  padding: 15px 30px;
  gap: 10px;
  border-radius: 5px;
`;
