import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';

import { useFetchEventListQuery } from './network/eventListQueries';
import Filter from './components/Filter';
import EventCard from './components/EventCard';
import { useSearchParams } from 'react-router-dom';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [regions, setRegions] = useState<
    { areaCode: string; sigunguCode: string }[]
  >([]);

  // TODO: regions에 들어있는 코드 모두를 이용해서 해당하는 것들 모두 가져와야 함.
  const { data: eventList } = useFetchEventListQuery({
    numOfRows: 10,
    eventStartDate: format(new Date(), 'yyyyMMdd'),
    pageNo: 1,
    areaCode: regions?.[0]?.areaCode,
    sigunguCode: regions?.[0]?.sigunguCode || ''
  });

  useEffect(() => {
    const parsedRegions = searchParams.get('region')?.split(',');
    const regionObjList =
      parsedRegions?.map(region => ({
        areaCode: region.split('-')[0],
        sigunguCode: region.split('-')[1]
      })) || [];

    setRegions(regionObjList);
  }, [searchParams.get('region'), setRegions]);

  return (
    <ContentWrapper>
      <Filter />
      <SimpleGrid minChildWidth="232px" spacing="32px" as={CardListContainer}>
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
  gap: 27px;
  padding: 40px 112px;
`;

const CardListContainer = styled.div`
  width: 100%;
`;

export default CategoryPage;
