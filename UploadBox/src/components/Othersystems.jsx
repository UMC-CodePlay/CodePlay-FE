import styled from "styled-components";

const Othersystems = () => {
  return (
    <>
      <Container></Container>
    </>
  );
};

export default Othersystems;

const Container = styled.div`
  background-color: #f3f3f3;
  postion : flex;
  width:; 100%;
  height : 720px; 
  margin :0;
  padding : 0 ;
    `;

const Container_2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 90px;
`;

const Imagebox = styled.div`
  width: 300px;
  height: 190px;
  background-color: #d9d9d9;
`;
