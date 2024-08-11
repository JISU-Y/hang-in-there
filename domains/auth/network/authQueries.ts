import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

export const useReissueTokenQuery = (options?: UseQueryOptions) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storageAccessToken = localStorage.getItem('accessToken');

    setAccessToken(storageAccessToken || '');
  }, []);

  return useQuery({
    queryKey: 'token-reissue',
    queryFn: async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/reissue` ||
          '',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    },
    ...options,
    enabled: false
  });
};
