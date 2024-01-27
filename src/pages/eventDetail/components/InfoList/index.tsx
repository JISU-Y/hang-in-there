import styled from '@emotion/styled';

interface InfoListProps {
  title: string;
  value: string;
}

const InfoList = ({ title, value }: InfoListProps) => {
  return (
    <Container>
      <InfoKey>{title}</InfoKey>
      <InfoValue>{value}</InfoValue>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const InfoKey = styled.h4`
  font-size: 18px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const InfoValue = styled.span`
  font-size: 18px;
  font-weight: 400;
  padding: 4px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default InfoList;
