// src/components/1screen/AdIcons.jsx

import { useState } from "react";
import styled from "styled-components";
import LogoAd from "../../assets/Landing_img/now_playing.svg";
import harmonyIcon from "../../assets/Landing_img/harmony.svg";
import harmonyExpIcon from "../../assets/Landing_img/harmony_exp.svg";
import sessIcon from "../../assets/Landing_img/sess.svg";
import sessExpIcon from "../../assets/Landing_img/sess_exp.svg";
import remixIcon from "../../assets/Landing_img/remix.svg";
import remixExpIcon from "../../assets/Landing_img/remix_exp.svg";


const adIconsData = [
  {
    id: 1,
    defaultImg: harmonyIcon,
    hoverImg: harmonyExpIcon,
  },
  {
    id: 2,
    defaultImg: sessIcon,
    hoverImg: sessExpIcon,
  },
  {
    id: 3,
    defaultImg: remixIcon,
    hoverImg: remixExpIcon,
  },
];

const AdIcons = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <AdIconsWrapper>
      <img src={LogoAd} alt="LogoAd" />

      <IconContainer>
        {adIconsData.map((icon) => (
          <IconItem
            key={icon.id}
            onMouseEnter={() => setHovered(icon.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <IconImg
              src={hovered === icon.id ? icon.hoverImg : icon.defaultImg}
              alt={`icon-${icon.id}`}
            />

          </IconItem>
        ))}
      </IconContainer>
    </AdIconsWrapper>
  );
};

export default AdIcons;

/* ===== styled-components ===== */

/* 검정 배경 섹션 */
const AdIconsWrapper = styled.div`
  width: 100%;
  min-height: 900px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 178px;
  background: #000; /* 배경 검은색 */
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 72px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 호버 시 아이콘 확대를 위해 transition 적용 */
  /* pointer: 커서를 손가락 모양으로 */
  cursor: pointer;

  /* IconImg에 호버 효과를 줄 것이므로 
     "IconItem:hover IconImg" 형태로 작성 */
  &:hover ${'' /* 스타일링 내부에서 IconImg 참조 */} {
    transform: scale(1.04);
  }
`;

/* 아이콘 이미지를 기본 크기로 두고, 호버 시 확대 */
const IconImg = styled.img`
  width: auto;    /* SVG 원본 크기대로 */
  height: auto;
  transition: transform 0.4s ease-in-out;
`;

