import { useState } from "react";
import styled from "styled-components";
import LogoAd from "../../assets/Logo_img/logoAd.svg";

const adIconsData = [
  {
    id: 1,
    title: "코드플레이의 \n장점 첫번째",
    subtext: "111111\n101101",
  },
  {
    id: 2,
    title: "코드플레이의\n장점 두번째",
    subtext: "101010\n010101",
  },
  {
    id: 3,
    title: "코드플레이의\n장점 세번째",
    subtext: "000111\n111000",
  },
];

const AdIcons = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <AdIconsWrapper>
            <img src={LogoAd}/>
        <IconContainer>
        {adIconsData.map((icon) => (
            <IconItem key={icon.id}>
            <IconWrapper
            onMouseEnter={() => setHovered(icon.id)}
            onMouseLeave={() => setHovered(null)}
            isHovered={hovered === icon.id}>
                <IconText isHovered={hovered === icon.id}>{icon.title}</IconText>
                <IconSubText isHovered={hovered === icon.id}>{icon.subtext}</IconSubText>
            </IconWrapper>
            </IconItem>
        ))}
        </IconContainer>
    </AdIconsWrapper>
  );
};

export default AdIcons;

const AdIconsWrapper = styled.div`
width:100%;
height: 900px;
position: relative;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 178px;
background: rgba(249, 249, 249, 1);
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px; 
  margin-top: 72px;
`;

const IconItem = styled.div`
  width: 387px;  
  height: 426px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 46px;
  background: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease-in-out;
  border: 4.7px solid transparent;
  &:hover {
    transform: scale(1.04);
    border-color: rgba(111, 61, 161, 1);
    background: radial-gradient(50% 50% at 50% 50%, #F9F4FF 0%, #F8F0FF 100%);
  }
`;

const IconText = styled.h3`
  font-family: "Pretendard", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 38.19px;
  text-align: left;
  color: black;
  margin-bottom: 20px;
  white-space: pre-line;
  ${IconWrapper}:hover & {
    font-family: "Roboto", sans-serif;
    font-size: 33px;
    line-height: 39px;
  }
`;

const IconSubText = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  color: black;
  white-space: pre-line;
  ${IconWrapper}:hover & {
    font-family: "Roboto", sans-serif;
    font-size: 21px;
    line-height: 31px;
  }
`;