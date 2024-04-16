import { useEffect } from 'react';

const EventMap = () => {
  // TODO: Map 로드가 안되고 있음.
  // useEffect(() => {
  //   function loadNaverMapsScript() {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  //       import.meta.env.VITE_NAVER_MAPS_CLIENT_ID
  //     }`;
  //     script.async = true;

  //     document.body.appendChild(script);
  //   }

  //   loadNaverMapsScript();
  // }, []);

  useEffect(() => {
    if (!window.naver) return;

    // const location = new naver.maps.LatLng(37.5656, 126.9769);
    // const mapOptions = {
    //   center: location,
    //   zoom: 17,
    //   zoomControl: true
    // };

    // const mapDiv = document.getElementById('map');
    // const map = new naver.maps.Map(mapDiv, {
    //   center: new naver.maps.LatLng(37.3595704, 127.105399),
    //   zoom: 15
    // });

    // const marker = new naver.maps.Marker({
    //   position: new naver.maps.LatLng(37.3595704, 127.105399),
    //   map: map
    // });
  }, []);

  return (
    <>
      <h1>Naver Map - Default</h1>

      <div id="map" style={{ width: '400px', minHeight: '400px' }} />
    </>
  );
};

export default EventMap;
