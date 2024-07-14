import { useState } from 'react';

const useGeoLocationPoint = () => {
  const [loading, setLoading] = useState(false);

  const loadGeoLocation = async () => {
    // NOTE: 브라우저의 navigator에서 geolocation을 지원하지 않는 경우 return
    const supportGeoLocation = 'geolocation' in navigator;
    if (!supportGeoLocation) return;

    try {
      setLoading(true);

      // NOTE: 첫번째 인자 success 콜백 안에서 로직을 넣는 게 아닌 꺼내서 바깥에서 쓰고 싶어서 Promise 문법 사용
      const { latitude, longitude } = await new Promise<{
        latitude: number;
        longitude: number;
      }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            return resolve(position.coords);
          },
          error => reject(error)
        );
      });

      return {
        latitude,
        longitude
      };
    } catch (e: any) {
      switch (e.code) {
        case 1: // 사용자가 명시적으로 차단함
          alert('위치 정보 기반 허용 필요');
          break;
        case 2: // 일시적 오류, mixed content 를 경험한 safari user
          // 위치 정보 오류
          break;
        case 3: // TIMEOUT
          break;
        default:
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loadGeoLocation
  };
};

export default useGeoLocationPoint;
