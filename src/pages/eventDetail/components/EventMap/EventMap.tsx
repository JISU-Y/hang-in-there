import { useEffect, useRef } from 'react';

const EventMap = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const { naver } = window;

  // useEffect(() => {
  //   function loadNaverMapsScript() {
  //     if (window.naver && window.naver.maps) return;

  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  //       import.meta.env.VITE_NAVER_MAPS_CLIENT_ID
  //     }`;
  //     script.async = true;

  //     document.head.appendChild(script);
  //   }

  //   loadNaverMapsScript();
  // }, []);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map
    });
  }, [naver]);

  return (
    <>
      <h1>Naver Map - Default</h1>
      <div ref={mapElement} style={{ minHeight: '400px' }} />
    </>
  );
};

export default EventMap;
