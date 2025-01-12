import styled from "styled-components";

//화상 분석, 악보 생성 등을 생성하는 TitleNavbar
/*사용 방법 : 
    <TitleNavbar
        title="화상 분석"
        subtitle="어쩌고저쩌고 그냥 그런 내용들"
    ></TitleNavbar> 
    이렇게 작성해서 title, subtitle을 해당 jsx에서 설정할 수 있음 */
// eslint-disable-next-line react/prop-types
const TitleNavbar = ({ title, subtitle }) => {
  return (
    <div>
      <StyledTitle>
        <Title>
          <text>
            <h1>{title}</h1>
          </text>
        </Title>
        <SubTitle>
          <text>
            <h3>{subtitle}</h3>
          </text>
        </SubTitle>
      </StyledTitle>
    </div>
  );
};

export default TitleNavbar;

const StyledTitle = styled.div`
  background-color: #f3f3f3;
  width: 100%;
  height: 250px;
  color: white;
  margin-top: 100px;
  position: flex;
  align-items: center;
  display: gird;
  top: 100px;
  z-index: 1000;
  justify-content: space-between;
  left: 0;
  grid-template-rows: auto auto;
  border-bottom: 1px solid var(--gray-regular-line, #c9c3ce);
`;

const Title = styled.div`
  display: flex;
  padding-top: 50px;
  color: #000;
  justify-content: center;
`;

const SubTitle = styled.div`
  display: flex;
  color: #000;
  justify-content: center;
`;
