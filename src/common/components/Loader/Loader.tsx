import styled from '@emotion/styled';
import LoadingSpinner from './LoadingSpinner';

interface LoaderProps {
  description?: string;
}

const Loader = ({ description }: LoaderProps) => {
  return (
    <Container>
      <LoadingSpinner />
      <WaitingText>잠시만 기다려주세요...</WaitingText>
      {description && <Text>{description}</Text>}
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  width: fit-content;

  padding: 10px;
`;

const WaitingText = styled.h4`
  font-size: 24px;
  font-weight: 400;
  color: #999999;
`;

const Text = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: #999999;

  white-space: pre-line;
  text-align: center;
`;
