/* eslint-disable react/prop-types */
import React, { useState, Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Logo from "../assets/logo_bk_white.svg";
import prevarrow_on from "../assets/prevarrow_on.svg";
import nextarrow_on from "../assets/nextarrow_on.svg";

const Slick = () => {
  const PrevArrowContainer = styled.div`
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    cursor: pointer;
  `;

  const NextArrowContainer = styled.div`
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    cursor: pointer;
  `;

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <PrevArrowContainer onClick={onClick}>
        <img alt="Previous" src={prevarrow_on} style={{ width: "20px" }} />
      </PrevArrowContainer>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <NextArrowContainer onClick={onClick}>
        <img alt="Next" src={nextarrow_on} style={{ width: "20px" }} />
      </NextArrowContainer>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      <div>
        <Total_Conatiner>
          <ResultsConatiner>
            <Results>
              <Analysis_title>
                <img src={Logo} />키 :
              </Analysis_title>
            </Results>
            <Analysis_content>이것은 설명입니다. </Analysis_content>
          </ResultsConatiner>
        </Total_Conatiner>
      </div>
      <div>
        <Total_Conatiner>
          <ResultsConatiner>
            <Results>
              <Analysis_title>
                <img src={Logo} />
                템포 :
              </Analysis_title>
            </Results>
            <Analysis_content>이것은 설명입니다. </Analysis_content>
          </ResultsConatiner>
        </Total_Conatiner>
      </div>
      <div>
        <Total_Conatiner>
          <ResultsConatiner>
            <Results>
              <Analysis_title>
                <img src={Logo} />
                음압 :
              </Analysis_title>
            </Results>
            <Analysis_content>이것은 설명입니다. </Analysis_content>
          </ResultsConatiner>
        </Total_Conatiner>
      </div>
    </Slider>
  );
};

export default Slick;

const Wrapper = styled.div``;
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
