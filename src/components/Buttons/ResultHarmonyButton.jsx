import styled from "styled-components";
const ResultHarmonyButton = ({ title, subtitle }) => {
  return (
    <ButtonWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <SubtitleWrapper>{subtitle}</SubtitleWrapper>
    </ButtonWrapper>
  );
};

export default ResultHarmonyButton;

const ButtonWrapper = styled.button`
  display: flex;
  width: 150px;
  height: 100px;
  padding: 44px 106px 33px 106px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 2px solid var(--gray-text1, #92879d);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    border-radius: 30px;
    border: 2px solid var(--gray-text1, #92879d);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 20px 0px #9747ff;
    cursor: pointer;
  }
  &:active {
    border-radius: 30px;
    border: 2px solid var(--gray-text1, #92879d);
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 0px 20px 0px #9747ff;
  }
`;

const TitleWrapper = styled.div`
  color: var(--White, #fff);
  text-align: center;

  /* Body L */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SubtitleWrapper = styled.div`
  color: var(--White, #fff);
  text-align: center;
  /* H1 */
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
