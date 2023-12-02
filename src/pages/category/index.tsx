import styled from '@emotion/styled';
import PageLayout from '@src/common/layouts/PageLayout';
import EventCard from './components/EventCard';
import { SimpleGrid } from '@chakra-ui/react';

const CategoryPage = () => {
  return (
    <PageLayout>
      <ContentWrapper>
        <TitleWrapper>
          <PageTitle>축제</PageTitle>
        </TitleWrapper>
        <SimpleGrid columns={2} spacing={8} as={CardListContainer}>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </SimpleGrid>
      </ContentWrapper>
    </PageLayout>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 64px 48px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid lightgray;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  width: fit-content;
  padding: 8px 32px;
  background-color: lightgray;
`;

const CardListContainer = styled.div`
  width: 100%;
`;

export default CategoryPage;
