import styled from '@emotion/styled';

interface EventMapProps {
  position: {
    lat: number;
    lng: number;
  };
}

const EventMap = ({ position }: EventMapProps) => {
  // useEffect(() => {
  //   function loadNaverMapsScript() {
  //     const script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?w=300&h=300&center=127.1054221,37.3591614&level=16=${
  //       process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID
  //     }`;
  //     script.async = true;

  //     document.body.appendChild(script);
  //   }

  //   loadNaverMapsScript();
  // }, []);

  // useEffect(() => {
  //   if (!window.naver) return;

  //   const location = new naver.maps.LatLng(37.5656, 126.9769);
  //   const mapOptions = {
  //     center: location,
  //     zoom: 17,
  //     zoomControl: true
  //   };

  //   const mapDiv = document.getElementById('map');
  //   const map = new naver.maps.Map(mapDiv, {
  //     center: new naver.maps.LatLng(37.3595704, 127.105399),
  //     zoom: 15
  //   });

  //   const marker = new naver.maps.Marker({
  //     position: new naver.maps.LatLng(37.3595704, 127.105399),
  //     map: map
  //   });
  // }, []);

  return (
    <>
      <ImageWrapper>
        <img
          src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=1024&h=406&scale=2&center=${position.lng},${position.lat}&markers=type:d|size:mid|color:orange|pos:${position.lng}%20${position.lat}&level=12&X-NCP-APIGW-API-KEY-ID=${process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID}`}
        />
      </ImageWrapper>

      {/* TODO: Map 띄우면 계속 naver maps net::ERR_CERT_COMMON_NAME_INVALID 이 에러 뜸. 그러면서 RAM 엄청 돌아감. */}
      {/* <div id="map" style={{ width: '400px', minHeight: '400px' }} /> */}
    </>
  );
};

export default EventMap;

const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;
