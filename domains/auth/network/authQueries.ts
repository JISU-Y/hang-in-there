import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export const useReissueTokenQuery = (options?: UseQueryOptions) => {
  const accessToken = localStorage.getItem('accessToken');

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
