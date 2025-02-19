import { useState } from "react";
import styled from "styled-components";
import Vocal1 from "../../assets/Landing_img/Vocal1.svg";
import Vocal2 from "../../assets/Landing_img/Vocal2.svg";
import Bass1 from "../../assets/Landing_img/Bass1.svg";
import Bass2 from "../../assets/Landing_img/Bass2.svg";
import Drum1 from "../../assets/Landing_img/Drum1.svg";
import Drum2 from "../../assets/Landing_img/Drum2.svg";
import Mr1 from "../../assets/Landing_img/Mr1.svg";
import Mr2 from "../../assets/Landing_img/Mr2.svg";

const icons = [
  { id: 1, defaultImg: Vocal1, hoverImg: Vocal2 },
  { id: 2, defaultImg: Bass1, hoverImg: Bass2 },
  { id: 3, defaultImg: Drum1, hoverImg: Drum2 },
  { id: 4, defaultImg: Mr1, hoverImg: Mr2 },
];

const StemIcons = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <IconContainer>
      {icons.map((icon) => (
        <IconImage
          key={icon.id}
          src={hovered === icon.id ? icon.hoverImg : icon.defaultImg}
          onMouseEnter={() => setHovered(icon.id)}
          onMouseLeave={() => setHovered(null)}
          alt="Instrument Icon"
        />
      ))}
    </IconContainer>
  );
};

export default StemIcons;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
`;

const IconImage = styled.img`
  width: 274px;
  height:274px;
  transition: opacity 0.1s ease-in-out;
  object-fit: contain;
`
