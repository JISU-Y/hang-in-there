import { useState } from 'react';

import { format } from 'date-fns';
import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';

import {
  useFetchAreaCodeListQuery,
  useFetchEventListQuery
} from './network/eventListQueries';
import Filter from './components/Filter';
import EventCard from './components/EventCard';

const CategoryPage = () => {
  const [regionCode, setRegionCode] = useState('');

  const { data: eventList } = useFetchEventListQuery({
    numOfRows: 10,
    eventStartDate: format(new Date(), 'yyyyMMdd'),
    pageNo: 1
  });
  const { data } = useFetchAreaCodeListQuery(regionCode, {
    enabled: !!regionCode
  });

  return (
    <ContentWrapper>
      <TitleWrapper>
        <PageTitle>축제</PageTitle>
      </TitleWrapper>
      <Filter />
      <SimpleGrid columns={2} spacing={8} as={CardListContainer}>
        {eventList?.map(event => (
          <EventCard
            eventId={event.contentid}
            imageUrl={event.firstimage}
            title={event.title}
            status="always"
            range={{
              startDate: event.eventstartdate,
              endDate: event.eventenddate
            }}
            location={event.addr1}
          />
        ))}
      </SimpleGrid>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
