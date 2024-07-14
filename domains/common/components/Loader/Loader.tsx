import styled from '@emotion/styled';

import LoadingSpinner, { LoadingSpinnerProps } from './LoadingSpinner';

interface LoaderProps {
  spinnerSize: LoadingSpinnerProps['size'];
  description?: string;
}

const Loader = ({ spinnerSize, description }: LoaderProps) => {
  return (
    <Container>
      <LoadingSpinner size={spinnerSize} />
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
  gap: 16px;

  width: 100%;

  padding: 10px;
`;

const WaitingText = styled.h4`
  font-size: 18px;
  font-weight: 400;
  color: #999999;
`;

const Text = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #999999;

  white-space: pre-line;
  text-align: center;
`;
