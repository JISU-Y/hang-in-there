import { useState } from 'react';

import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';

import { useFetchEventListInfiniteQuery } from './network/eventListQueries';
import Filter from './components/Filter';
import EventCard from './components/EventCard';
import { useSearchParams } from 'react-router-dom';
import { ImpressionArea } from '@toss/impression-area';
import EmptyResult from './components/EmptyResult/EmptyResult';
import Breadcrumbs from '@src/common/components/Breadcrums/Breadcrums';
import {
  CATEGORY_CODE,
  CategoryCodeType
} from '@src/common/constants/categories';
import Loader from '@src/common/components/Loader/Loader';

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;
  const areaCode = searchParams.getAll('areaCode')?.[0];
  const status = searchParams.getAll('status')?.[0];

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
    area_cd: areaCode,
    status,
    ...(categoryCode && {
      sub_category: String(CATEGORY_CODE[categoryCode].code) || undefined
    }),
    ...(categoryCode && {
      detail_sub_category: CATEGORY_CODE[categoryCode].subCategoryList.join(',')
    })
  });

  const handleSetGeoLocation = (param: { mapX: string; mapY: string }) => {
    setGeoLocation(param);
  };

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader
          description={`홈 화면에서 진행 예정인 행사를\n확인할 수 있어요`}
        />
      </LoaderWrapper>
    );
  }

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
              (eventListPageData?.pages || []).flatMap(event => (
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

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 112px;
  height: calc(100vh - 116px);
`;

export default CategoryPage;
