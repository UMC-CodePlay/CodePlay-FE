import React, { useState, Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Logo from "../assets/logo_bk_white.svg";

const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    arrow: true,
  };

  return (
    <>
      <Slider {...settings}>
        <>
          <Total_Conatiner>
            <ResultsConatiner>
              <Results>
                <Analysis_title>
                  <img src={Logo} />
                  분석 결과 1:
                </Analysis_title>
              </Results>
              <Analysis_content>이것은 설명입니다. </Analysis_content>
            </ResultsConatiner>
          </Total_Conatiner>
        </>
        <>
          <Total_Conatiner>
            <ResultsConatiner>
              <Results>
                <Analysis_title>
                  <img src={Logo} />
                  분석 결과 1:
                </Analysis_title>
              </Results>
              <Analysis_content>이것은 설명입니다. </Analysis_content>
            </ResultsConatiner>
          </Total_Conatiner>
        </>
        <>
          <Total_Conatiner>
            <ResultsConatiner>
              <Results>
                <Analysis_title>
                  <img src={Logo} />
                  분석 결과 1:
                </Analysis_title>
              </Results>
              <Analysis_content>이것은 설명입니다. </Analysis_content>
            </ResultsConatiner>
          </Total_Conatiner>
        </>
      </Slider>
    </>
  );
};

export default Slick;

const SLider = styled.div``;
const Total_Conatiner = styled.div`
  display: flex;
  justify-content: center;
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
