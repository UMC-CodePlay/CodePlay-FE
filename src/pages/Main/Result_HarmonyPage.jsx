import styled from "styled-components";
import React, { useState } from "react";
import "../../components/2screen/harmony.css";
import Logo from "../../assets/Logo_img/logo_bk_white.svg";
import Navbar from "../../components/Navbar";
import TitleNavbar from "../../components/TitleNavbar";
import UploadBox from "../../components/UploadBox";
import Othersystems from "../../components/Othersystems";
import "../../components/Buttons/TertiaryWhiteButton.css";
import "../../components/Buttons/TertiaryBlackButton.css";
import { Link } from "react-router-dom";
import Slick from "../../components/Slick";
import PurpleButton from "../../components/Buttons/PurpleButton";
import ResultHarmonyButton from "../../components/Buttons/ResultHarmonyButton";
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
        <Link to="/harmony">이전으로</Link>
        <PurpleButton>
          <Link to="/">다운로드</Link>
        </PurpleButton>
      </div>
      <Othersystems></Othersystems>
    </>
  );
};

export default Result_HarmonyPage;

const To_under_button = styled.div`
  padding-top: 80px;
`;

const Total_Conatiner = styled.div`
  display: flex;
  justify-content: center;
`;

const ResultsConatiner = styled.div`
  display: flex;
  width: 1100px;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  border-radius: 30px;
  background: var(--badkground, #f9f9f9);
  display: grid;
  grid-templatet-rows: repeat(5, 1fr);
  border-bottom: 1px solid var(--gray-lightline, #e4e1e7);
`;

const Analysis_title = styled.div`
  display: flex;
  padding: 0 0 10px 10px;
  gap: 20px;
  color: var(--black, #190828);
  width: 100%;

  /* Body L */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-margin: 0 0 0 20px;
  alings-items: center;
`;
const Analysis_content = styled.div`
  color: var(--black, #190828);
  text-align: justify;
  margin-bottom: 40px;
  /* Body R */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-left: 30px;
`;

const Results = styled.div`
  gap: 30px;
  border-bottom: 1px solid var(--gray-lightline, #e4e1e7);
`;
