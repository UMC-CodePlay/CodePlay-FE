import styled from "styled-components";
import Background_Result1 from "../assets/Background_Result1.svg";
import Background_Result2 from "../assets/Background_Result2.svg";
import Background_Result3 from "../assets/Background_result3.svg";
import Background_Result4 from "../assets/Background_Result4.svg";
const BackGroundResult = () => {
  return (
    <>
      <BackGround>
        <SvgImage3 img src={Background_Result3}></SvgImage3>
        <SvgImage img src={Background_Result1}></SvgImage>
        <SvgImage1 img src={Background_Result2}></SvgImage1>
        <SvgImage4 img src={Background_Result2}></SvgImage4>
      </BackGround>
    </>
  );
};

export default BackGroundResult;

const BackGround = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  left: 0;
  z-index: -1;
  position: absolute;
  margin-top: 0;
`;

const SvgImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: color;
`;
const SvgImage1 = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: color;
  background: 91.829% 91.829% no-repeat;
`;

const SvgImage3 = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absoulte;
  left: 0;
  z-index: -2;
`;

const SvgImage4 = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: color;
  z-index: -1;
`;
