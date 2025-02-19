import styled from "styled-components";

//화상 분석, 악보 생성 등을 생성하는 TitleNavbar
/*사용 방법 : 
    <TitleNavbar
        title="화상 분석"
        subtitle="어쩌고저쩌고 그냥 그런 내용들"
    ></TitleNavbar> 
    이렇게 작성해서 title, subtitle을 해당 jsx에서 설정할 수 있음 */
const TitleNavbar = ({ title, subtitle }) => {
  return (
    <div>
      <StyledTitle>
        <Title>
          <text>{title}</text>
        </Title>
        <SubTitle>
          <text>{subtitle}</text>
        </SubTitle>
      </StyledTitle>
    </div>
  );
};

export default TitleNavbar;

const StyledTitle = styled.div`
  background: var(--badkground, #000000);
  width: 100%;
  height: 300px;
  color: #ffffff;
  position: flex;
  display: gird;
  top: 100px;
  z-index: 1000;
  margin-top: 100px;
  justify-content: space-between;
  left: 0;
  grid-template-rows: 1fr 1fr;
`;

const Title = styled.div`
  display: flex;
  padding-top: 100px;
  color: #ffffff;
  text {
    font-family: Pretendard, sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  justify-content: center;
`;

const SubTitle = styled.div`
  display: flex;
  padding-top: 25px;
  color: #ffffff;
  text {
    font-family: Roboto, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  justify-content: center;
`;
