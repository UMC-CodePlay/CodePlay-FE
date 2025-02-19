// src/components/Buttons/ResultHarmonyButton.jsx
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
  display: grid;
  width: 150px;
  height: auto;
  padding: 44px 106px 33px 106px;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 2px solid var(--gray-text1, #92879d);
  background: rgba(255, 255, 255, 0);

  &:hover {
    border-radius: 30px;
    border: 2px solid var(--gray-text1, #92879d);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 20px 0px #9747ff;
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  color: var(--White, #fff);
  text-align: center;
  /* Body L */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 60;
  line-height: normal;
  white-space: nowrap; /* 타이틀을 한 줄로 유지 */
`;

const SubtitleWrapper = styled.div`
  color: var(--White, #fff);
  text-align: center;
  /* H1 */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
