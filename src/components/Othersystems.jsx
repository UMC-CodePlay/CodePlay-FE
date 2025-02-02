import styled from "styled-components";
import session from "../assets/seperate_session.svg";
import harmony from "../assets/seperate_harmony.svg";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ImageComponent = () => {
  const location = useLocation();

  const imageSrc = location.pathname.includes("harmony")
    ? session
    : location.pathname.includes("session")
      ? harmony
      : null;

  const linkPath = location.pathname.includes("/harmony")
    ? "/session"
    : "/harmony";

  return (
    <>
      {imageSrc ? (
        <Link to={linkPath}>
          <img src={imageSrc} alt="Dynamic" style={{ curosr: "pointer" }} />
        </Link>
      ) : (
        <p>이미지가 없습니다.</p>
      )}
    </>
  );
};

const Othersystems = () => {
  const linkPath = location.pathname.includes("/harmony")
    ? "/session"
    : "/harmony";

  return (
    <>
      <Container>
        <DifferentFunction>
          <h3>이런 기능도 있어요</h3>
        </DifferentFunction>

        <Container2>
          <>
            <ImageComponent></ImageComponent>
          </>
          <>
            <h5>{linkPath === "/harmony" ? "화성 분석" : "세션 분리"}</h5>
          </>
        </Container2>
      </Container>
    </>
  );
};

export default Othersystems;

const Container = styled.div`
  background: var(--bg, #17171E);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  postion : flex;
  width:; 100%;
  height : 720px; 
  margin-top : 150px;
  padding : 0 ;
  color : #ffffff;
  `;

const DifferentFunction = styled.div`
  display: flex;
  padding-top: 100px;
  color: #000;
  justify-content: center;
  align-self: stretch;
`;

const Container2 = styled.div`
  gap: 10px;
  padding-top: 50px;
  display: grid;
  grid-template-rows: auto auto;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;
