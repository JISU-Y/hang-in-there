import { useEffect, useRef, useState } from 'react';

function loadNaverMapsScript(callback: () => void) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID}`;
  script.async = true;
  script.onload = () => callback();

  document.head.appendChild(script);
}

interface EventMapProps {
  position: {
    lat: number;
    lng: number;
  };
}

const EventMap = ({ position }: EventMapProps) => {
  const mapElement = useRef<HTMLDivElement | null>(null);

  const [, setMapLoaded] = useState(false);
  const [newMap, setNewMap] = useState<naver.maps.Map | null>(null);

  const initMap = () => {
    // 추가 옵션 설정
    const mapOptions = {
      zoomControl: true,
      center: new naver.maps.LatLng(position.lat, position.lng),
      zoom: 16,
      draggable: false,
      scrollWheel: false,
      disableKineticPan: false
    };

    // 지도 초기화 확인
    if (document.getElementById('map')) {
      const map = new naver.maps.Map('map', mapOptions);
      setNewMap(map);
    }

    // 지도 로드 완료
    setMapLoaded(true);
  };

  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === 'undefined') {
      loadNaverMapsScript(initMap);
    } else {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (!newMap) return;

    // Marker 생성
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: newMap
    });
  }, [newMap, position]);

  return (
    <div id="map" ref={mapElement} style={{ width: '100%', height: '400px' }} />
  );
};

export default EventMap;
