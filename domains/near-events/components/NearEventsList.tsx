'use client';

import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';
import { ImpressionArea } from '@toss/impression-area';
import useGeoLocationPoint from '@logics/hooks/useGeoLocation';
import Loader from '@domains/common/components/Loader/Loader';
import EventCard from '@domains/category/components/EventCard';
import { useFetchNearEventListQuery } from '@domains/category/network/eventListQueries';

const NearEventsList = () => {
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const [geoLocation, setGeoLocation] = useState<{
    mapX: string;
    mapY: string;
  }>({ mapX: '', mapY: '' });

  const { loading: isLocationLoading, loadGeoLocation } = useGeoLocationPoint();

  const { data: nearEventList, isLoading } = useFetchNearEventListQuery({
    mapX: geoLocation.mapX,
    mapY: geoLocation.mapY
  });

  const loadUserLocation = async () => {
    try {
      const geoLocationRes = await loadGeoLocation();

      if (geoLocationRes) {
        const { latitude, longitude } = geoLocationRes;
        setGeoLocation({
          mapX: String(longitude),
          mapY: String(latitude)
        });
      }
    } catch (error) {
      console.error('위치 정보를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    loadUserLocation();
  }, []);

  return (
    <ListContainer ref={listContainerRef}>
      {isLoading || isLocationLoading ? (
        <LoaderWrapper>
          <Loader
            spinnerSize="l"
            description="내 주변 행사를 불러오고 있어요"
          />
        </LoaderWrapper>
      ) : (
        <>
          {!nearEventList || nearEventList.length === 0 ? (
            <EmptyMessage>
              주변에 행사가 없습니다. 다른 지역을 확인해보세요.
            </EmptyMessage>
          ) : (
            <EventListWrapper>
              <SimpleGrid columns={2} spacing="16px" width="100%">
                {nearEventList.map(event => (
                  <EventCard
                    key={event.event_id}
                    eventId={String(event.event_id)}
                    imageUrl={event.image}
                    title={event.title}
                    status="always"
                    location={event.addr}
                  />
                ))}
              </SimpleGrid>

              <HeightImpressionArea
                onImpressionStart={() => {
                  // 추후 무한 스크롤 구현 시 사용
                }}
                areaThreshold={0.5}
              />
            </EventListWrapper>
          )}
        </>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ListHeader = styled.div`
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const ListTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const EventCount = styled.p`
  font-size: 14px;

  strong {
    color: #ff6917;
    font-weight: 600;
  }
`;

const EventListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 2px;
  }
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
  flex: 1;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
  flex-shrink: 0;
`;

export default NearEventsList;
