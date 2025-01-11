import React from "react";
import styled from "styled-components";
import MRIcon from "../assets/Mr.svg";
import BassIcon from "../assets/Bass.svg";
import DrumIcon from "../assets/Drum.svg";

const Icons= () => {
  return (
    <IconContainer>
      <div>
        <Icon src={MRIcon}/>
        <Label>MR</Label>
      </div>
      <div>
        <Icon src={BassIcon}/>
        <Label>베이스</Label>
      </div>
      <div>
        <Icon src={DrumIcon}/>
        <Label>드럼</Label>
      </div>
    </IconContainer>
  );
};

export default Icons;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const Icon = styled.img`
  width: 114.87px;
  height: 114.87px;
`;

const Label = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 17.02px;
  font-weight: 400;
  line-height: 19.94px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;
