import styled, { createGlobalStyle } from "styled-components";

const AudioLoadingPage = () => {
  return (
    <>
      <GlobalStyled />
      <Global>
        <Titlecontent>오디오 처리 중...</Titlecontent>
        <SubTitlecontent>1~2분 정도 소요될 예정입니다.</SubTitlecontent>
        <SubTitlecontent>이 창을 닫지 마세요.</SubTitlecontent>
      </Global>
    </>
  );
};

export default AudioLoadingPage;

const GlobalStyled = createGlobalStyle`
body {
background : #000000;
height: 100%;
margin : 0;
padding: 0;
}`;
const Global = styled.div`
  background: #000000;
  width: 100%;
  height: 100%;
  gap: 30px;
  justify-items: center;
`;
const Titlecontent = styled.div`
  color: #ffffff;
  font-family: Pretendard;
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  justify-items: center;
`;

const SubTitlecontent = styled.div`
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: linear-gradient(
    93deg,
    #fff 1.71%,
    #7f9dff 24.36%,
    #9b97e8 29.13%,
    #dfbfff 35.78%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;
