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
        <Container2>
          <Container_left>
            <Imagebox></Imagebox>
            <h3>{To_other1}</h3>
          </Container_left>

          <Container_right>
            <Imagebox></Imagebox>
            <h3>{To_other2}</h3>
          </Container_right>
        </Container2>
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
  align-self: stretch;
`;

const DifferentFunction_subTitle = styled.div`
  display: flex;
  color: #000;
  justify-content: center;
`;

const Container2 = styled.div`
  gap: 120px;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container_left = styled.div`
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const Container_right = styled.div`
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const Imagebox = styled.div`
  display: flex;
  width: 300px;
  height: 190px;
  background-color: #d9d9d9;
`;