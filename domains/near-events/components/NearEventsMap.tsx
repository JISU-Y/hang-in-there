'use client';

import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useGeoLocationPoint from '@logics/hooks/useGeoLocation';
import { useFetchNearEventListQuery } from '@domains/category/network/eventListQueries';
import EventCard from '@domains/category/components/EventCard';
import LocationIcon from '@styles/icons/LocationIcon';

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

const NearEventsMap = () => {
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

  const { loading: isGeoLocationLoading, loadGeoLocation } =
    useGeoLocationPoint();

  const { data: nearEventList, isLoading: isEventLoading } =
    useFetchNearEventListQuery({
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
      zoom: 14,
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
          //   content,
          content: `<div class="event-marker"></div>`,
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
      // 주소 좌표 변환 (실제로는 API에서 좌표를 받아와야 함)
      // 여기서는 임시로 현재 위치 주변에 랜덤하게 배치
      const lat = currentPosition!.lat + (Math.random() - 0.5) * 0.01;
      const lng = currentPosition!.lng + (Math.random() - 0.5) * 0.01;

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map,
        icon: {
          content: `<div class="event-marker">${event.title.substring(0, 1)}</div>`,
          anchor: new naver.maps.Point(15, 15)
        }
      });

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, 'click', () => {
        if (isMobile) {
          setSelectedEvent(event);
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

  const handleCloseCard = () => {
    setSelectedEvent(null);
  };

  useEffect(() => {
    loadUserLocation();
    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!currentPosition) return;

    // 스크립트 로딩 확인
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

  return (
    <MapContainer>
      {isGeoLocationLoading && !mapLoaded ? (
        <LoadingMessage>지도를 불러오는 중입니다...</LoadingMessage>
      ) : (
        <>
          <MapElement id="near-events-map" ref={mapElement} />

          {isMobile && selectedEvent && (
            <MobileEventCard>
              <CloseButton onClick={handleCloseCard}>×</CloseButton>
              <EventCard
                eventId={String(selectedEvent.event_id)}
                imageUrl={selectedEvent.image}
                title={selectedEvent.title}
                status="always"
                location={selectedEvent.addr}
              />
            </MobileEventCard>
          )}
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

const MobileEventCard = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 320px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1001;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default NearEventsMap;
