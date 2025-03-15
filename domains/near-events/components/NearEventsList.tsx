'use client';

import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { SimpleGrid } from '@chakra-ui/react';
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
`;

const EventListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;

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

export default NearEventsList;
