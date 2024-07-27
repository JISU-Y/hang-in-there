import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { getAccessToken, removeAuthTokens } from '../utils/authTokenHandler';

export const useAuthSession = () => {
  const router = useRouter();

  const [token, setToken] = useState<string>('');

  const logout = () => {
    setToken('');
    removeAuthTokens();
  };

  const guardRoute = useCallback(
    (callback: () => void) => {
      if (!token) {
        router.push('/');

        return;
      }

      callback();
    },
    [router, token]
  );

  useEffect(() => {
    const token = getAccessToken();

    if (!token) return;

    try {
      setToken(token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  return {
    isUserLoggedIn: !!token,
    logout,
    guardRoute
  };
};
