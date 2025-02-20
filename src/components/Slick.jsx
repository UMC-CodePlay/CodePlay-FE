import React, { useState, Component, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import ResultHarmonyButton from "./Buttons/ResultHarmonyButton";

const Slick = ({ harmonyscale, harmonygenre, harmonybpm, harmonyvoiceColor }) => {
  return (
    <Wrapper>
      <ButtonContainer>
        <ResultHarmonyButton
          title={"Scale"}
          subtitle={harmonyscale}
        ></ResultHarmonyButton>
        <ResultHarmonyButton
          title={"BPM"}
          subtitle={harmonybpm}
        ></ResultHarmonyButton>
        <ResultHarmonyButton
          title={"장르"}
          subtitle={harmonygenre}
        ></ResultHarmonyButton>
        <ResultHarmonyButton
          title={"음색"}
          subtitle={harmonyvoiceColor}
        ></ResultHarmonyButton>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Slick;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  background: rgb(0, 0, 0, 0);
`;
