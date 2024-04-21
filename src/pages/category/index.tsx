import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';

import { useFetchEventListInfiniteQuery } from './network/eventListQueries';
import Filter from './components/Filter';
import EventCard from './components/EventCard';
import { useSearchParams } from 'react-router-dom';
import { ImpressionArea } from '@toss/impression-area';
import EmptyResult from './components/EmptyResult/EmptyResult';
import Breadcrumbs from '@src/common/components/Breadcrums/Breadcrums';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [regions, setRegions] = useState<
    { areaCode: string; sigunguCode: string }[]
  >([]);
  const [geoLocation, setGeoLocation] = useState<{
    mapX: string;
    mapY: string;
  }>();

  const {
    data: eventListPageData,
    fetchNextPage: fetchNextPageEventList,
    isLoading
  } = useFetchEventListInfiniteQuery({
    size: 10,
    page: 1,
    area_cd: '3'
    // sigungu_cd: regions?.[0]?.sigunguCode
    // category: string;
    // sub_category: string;
    // de.tail_sub_category?: string;
  });

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
      <BreadcrumWrapper>
        <Breadcrumbs />
      </BreadcrumWrapper>

      <ContainerWrapper>
        <Filter
          mapX={geoLocation?.mapX || ''}
          mapY={geoLocation?.mapY || ''}
          handleSetGeoLocation={handleSetGeoLocation}
        />

        <CardListContainer>
          <SimpleGrid minChildWidth="232px" spacing="32px">
            {isLoading ? (
              <div>loading..</div>
            ) : (
              eventListPageData?.pages?.flatMap(event => (
                <EventCard
                  key={event.event_id}
                  eventId={String(event.event_id)}
                  imageUrl={event.image}
                  title={event.title}
                  status="always"
                  range={{
                    startDate: event.event_st,
                    endDate: event.event_ed
                  }}
                  location={event.title}
                />
              ))
            )}
            {!isLoading && (eventListPageData?.pages?.length || 0) === 0 && (
              <EmptyResult />
            )}
          </SimpleGrid>
          <HeightImpressionArea
            onImpressionStart={() => fetchNextPageEventList()}
            areaThreshold={0.5}
          />
        </CardListContainer>
      </ContainerWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 112px;
`;

const BreadcrumWrapper = styled.div`
  width: 100%;
  margin-bottom: 27px;
`;

const ContainerWrapper = styled.div`
  display: flex;
  gap: 27px;
`;

const CardListContainer = styled.div`
  width: 100%;
`;

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
`;

export default CategoryPage;
