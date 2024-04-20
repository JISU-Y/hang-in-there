import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';

import {
  useFetchEventListInfiniteQuery,
  useFetchEventListInfiniteQueryH
} from './network/eventListQueries';
import Filter from './components/Filter';
import EventCard from './components/EventCard';
import { useSearchParams } from 'react-router-dom';
import { ImpressionArea } from '@toss/impression-area';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [regions, setRegions] = useState<
    { areaCode: string; sigunguCode: string }[]
  >([]);
  const [geoLocation, setGeoLocation] = useState<{
    mapX: string;
    mapY: string;
  }>();

  // TODO: regions에 들어있는 코드 모두를 이용해서 해당하는 것들 모두 가져와야 함.
  // TODO: category에 따라 다르게 요청해야 함.
  const { data: eventListPageData, fetchNextPage } =
    useFetchEventListInfiniteQuery({
      numOfRows: 10,
      eventStartDate: format(new Date(), 'yyyyMMdd'),
      pageNo: 1,
      areaCode: regions?.[0]?.areaCode,
      sigunguCode: regions?.[0]?.sigunguCode || ''
    });

  // const { data: eventListPageDataNew, fetchNextPage: fetchNextPageEventList } =
  //   useFetchEventListInfiniteQueryH({
  //     size: 10,
  //     page: 1
  //     // area_cd: regions?.[0]?.areaCode,
  //     // sigungu_cd: regions?.[0]?.sigunguCode
  //     // category: string;
  //     // sub_category: string;
  //     // detail_sub_category?: string;
  //   });

  const handleSetGeoLocation = (param: { mapX: string; mapY: string }) => {
    setGeoLocation(param);
  };

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
      <Filter
        mapX={geoLocation?.mapX || ''}
        mapY={geoLocation?.mapY || ''}
        handleSetGeoLocation={handleSetGeoLocation}
      />

      <CardListContainer>
        <SimpleGrid minChildWidth="232px" spacing="32px">
          {eventListPageData?.pages?.flatMap(event => (
            <EventCard
              key={event.contentid}
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
        <HeightImpressionArea
          onImpressionStart={() => fetchNextPage()}
          areaThreshold={0.5}
        />
      </CardListContainer>
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

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
`;

export default CategoryPage;
