import styled from '@emotion/styled';
import { DetailInfoUnionType } from '../../types/detail';
import { InfoKeyMapper } from '../../constants/detail';

interface InfoListProps {
  title: DetailInfoUnionType;
  value: string;
}

const InfoList = ({ title, value }: InfoListProps) => {
  return (
    <Container>
      <InfoKey>{InfoKeyMapper[title]}</InfoKey>
      <InfoValue>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </InfoValue>
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
