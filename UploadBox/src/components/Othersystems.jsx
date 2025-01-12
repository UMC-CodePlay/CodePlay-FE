import styled from "styled-components";

const Othersystems = ({ DF_subtitle, To_other1, To_other2 }) => {
  return (
    <>
      <Container>
        <DifferentFunction>
          <h1>이런 건 어때요?</h1>
        </DifferentFunction>
        <DifferentFunction_subTitle>
          <h3>{DF_subtitle}</h3>
        </DifferentFunction_subTitle>
        <Container_2>
          <Imagebox></Imagebox>

          <Imagebox></Imagebox>
        </Container_2>
      </Container>
    </>
  );
};

export default Othersystems;

const Container = styled.div`
  background-color: #f3f3f3;
  postion : flex;
  width:; 100%;
  height : 720px; 
  margin-top : 150px;
  padding : 0 ;
    `;

const DifferentFunction = styled.div`
  display: flex;
  padding-top: 100px;
  color: #000;
  justify-content: center;
`;

const DifferentFunction_subTitle = styled.div`
  display: flex;
  color: #000;
  justify-content: center;
`;

const Container_2 = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;

const Imagebox = styled.div`
  width: 300px;
  height: 190px;
  background-color: #d9d9d9;
`;
