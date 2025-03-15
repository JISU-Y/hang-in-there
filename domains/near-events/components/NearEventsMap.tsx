'use client';

import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import useGeoLocationPoint from '@logics/hooks/useGeoLocation';
import { useFetchNearEventListQuery } from '@domains/category/network/eventListQueries';
import { parseDate } from '@logics/utils/dateFormat';
import { CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

function loadNaverMapsScript(callback: () => void) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID}`;
  script.async = true;
  script.onload = () => callback();

  document.head.appendChild(script);
}

interface EventMarker {
  marker: naver.maps.Marker;
  event: any; // 이벤트 데이터 타입
}

// 새로운 이벤트 카드 컴포넌트
interface EventCardProps {
  eventId: string;
  imageUrl: string;
  title: string;
  location: string;
  date?: string;
  onClick?: () => void;
}

const EventCard = ({
  imageUrl,
  title,
  location,
  date,
  onClick
}: EventCardProps) => {
  return (
    <EventCardContainer onClick={onClick}>
      <EventImageWrapper>
        <EventImage src={imageUrl} alt={title} />
      </EventImageWrapper>
      <EventInfo>
        <EventTitle>{title}</EventTitle>
        <EventLocation>{location}</EventLocation>
        {date && <EventDate>{date}</EventDate>}
      </EventInfo>
    </EventCardContainer>
  );
};

const NearEventsMap = () => {
  const { push } = useRouter();

  const mapElement = useRef<HTMLDivElement | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [eventMarkers, setEventMarkers] = useState<EventMarker[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { loading: isGeoLocationLoading, loadGeoLocation } =
    useGeoLocationPoint();

  const { data: nearEventList } = useFetchNearEventListQuery({
    mapX: currentPosition?.lng.toString() || '',
    mapY: currentPosition?.lat.toString() || ''
  });

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const initMap = () => {
    if (!currentPosition || !mapElement.current) return;

    // 지도 옵션 설정
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      },
      center: new naver.maps.LatLng(currentPosition.lat, currentPosition.lng),
      zoom: 12,
      draggable: true,
      scrollWheel: true,
      disableKineticPan: false
    };

    // 지도 초기화
    if (mapElement.current) {
      const newMap = new naver.maps.Map(mapElement.current, mapOptions);
      setMap(newMap);

      const content = `<img src="/assets/marker.svg" width="40" height="40" alt="현재 위치"/>`;

      // 현재 위치 마커 생성
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng
        ),
        map: newMap,
        icon: {
          content,
          anchor: new naver.maps.Point(15, 15)
        }
      });
    }

    setMapLoaded(true);
  };

  const createEventMarkers = () => {
    if (!map || !nearEventList || nearEventList.length === 0) return;

    // 기존 마커 제거
    eventMarkers.forEach(({ marker }) => {
      marker.setMap(null);
    });

    // 새 마커 생성
    const newMarkers: EventMarker[] = nearEventList.map(event => {
      const lat = Number(event.map_y);
      const lng = Number(event.map_x);

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map,
        icon: {
          content: `<div class="event-marker" />`,
          anchor: new naver.maps.Point(15, 15)
        }
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        if (isMobile) {
          setSelectedEvent(event);
          setIsBottomSheetOpen(true);
        }
      });

      return { marker, event };
    });

    setEventMarkers(newMarkers);
  };

  const loadUserLocation = async () => {
    try {
      const geoLocationRes = await loadGeoLocation();

      if (geoLocationRes) {
        const { latitude, longitude } = geoLocationRes;
        setCurrentPosition({ lat: latitude, lng: longitude });
      }
    } catch (error) {
      console.error('위치 정보를 가져오는데 실패했습니다:', error);
      // 기본 위치 설정 (서울시청)
      setCurrentPosition({ lat: 37.5642135, lng: 127.0016985 });
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);

    setTimeout(() => {
      setSelectedEvent(null);
    }, 300); // NOTE: 애니메이션 시간과 맞춤
  };

  useEffect(() => {
    loadUserLocation();
    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!currentPosition) return;

    if (typeof window !== 'undefined') {
      if (typeof naver === 'undefined') {
        loadNaverMapsScript(initMap);
      } else {
        initMap();
      }
    }
  }, [currentPosition]);

  useEffect(() => {
    if (map && nearEventList) {
      createEventMarkers();
    }
  }, [map, nearEventList]);

  // 맵이 로드된 후 크기 재조정
  useEffect(() => {
    if (map) {
      const handleResize = () => {
        setTimeout(() => {
          map.refresh();
        }, 100);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [map]);

  const handleEventCardClick = () => {
    push(`/eventDetail/${selectedEvent.event_id}`);
  };

  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';

    const parsedStartDate = parseDate(startDate);

    if (!endDate || startDate === endDate) {
      return parsedStartDate;
    }

    const parsedEndDate = parseDate(endDate);
    return `${parsedStartDate} ~ ${parsedEndDate}`;
  };

  return (
    <MapContainer>
      {isGeoLocationLoading && !mapLoaded ? (
        <LoadingMessage>지도를 불러오는 중입니다...</LoadingMessage>
      ) : (
        <>
          <MapElement id="near-events-map" ref={mapElement} />

          <AnimatePresence>
            {isMobile && selectedEvent && isBottomSheetOpen && (
              <BottomSheet
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <BottomSheetHeader>
                  <CloseButton
                    whileHover={{
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}
                    whileTap={{
                      backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={handleCloseBottomSheet}
                  >
                    <CloseIcon width={3} height={3} />
                  </CloseButton>
                </BottomSheetHeader>
                <BottomSheetContent>
                  <EventCard
                    eventId={String(selectedEvent.event_id)}
                    imageUrl={
                      selectedEvent.image || 'https://placehold.co/600x400'
                    }
                    title={selectedEvent.title}
                    location={selectedEvent.addr}
                    date={formatDateRange(
                      selectedEvent.event_st,
                      selectedEvent.event_ed
                    )}
                    onClick={handleEventCardClick}
                  />
                </BottomSheetContent>
              </BottomSheet>
            )}
          </AnimatePresence>
        </>
      )}
      <style jsx global>{`
        .event-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #ff6917;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MapElement = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #666;
  font-size: 16px;
`;

const BottomSheet = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  padding: 8px 20px 20px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  height: auto;
  overflow: hidden;
  z-index: 100;
`;

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const BottomSheetContent = styled.div`
  width: 100%;
`;

const CloseButton = styled(motion.button)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

// 이벤트 카드 스타일 컴포넌트
const EventCardContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
`;

const EventImageWrapper = styled.div`
  width: 112px;
  height: 154px;
  flex-shrink: 0;
  overflow: hidden;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EventTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: #191919;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventLocation = styled.span`
  font-size: 14px;
  line-height: 1.2;
  color: #191919;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventDate = styled.span`
  font-size: 12px;
  color: #999999;
  font-weight: 400;
`;

export default NearEventsMap;
