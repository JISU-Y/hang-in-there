import styled from '@emotion/styled';
import { ChevronRightIcon } from '@chakra-ui/icons';

const EmptyResult = () => {
  return (
    <ResultContainer>
      <ResultTitle>😢 아쉽지만 다시 검색해보세요</ResultTitle>
      <ResultPhrase>이 지역에서 지금 진행 중인 행사가 없어요. </ResultPhrase>
      <ResetButton>
        <span>행사 다시 검색하기</span>
        <ChevronRightIcon w={8} h={8} strokeWidth={1} color="#FF6917" />
      </ResetButton>
    </ResultContainer>
  );
};

export default EmptyResult;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultTitle = styled.h3`
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  margin-bottom: 24px;
  color: #999999;
`;

const ResultPhrase = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  margin-bottom: 62px;
  color: #999999;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  margin-bottom: 24px;
  text-decoration: underline;
  color: #ff6917;
`;
