import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import {
  getAccessToken,
  removeAuthTokens,
  setAuthData
} from '../utils/authTokenHandler';

export const useAuthSession = () => {
  const router = useRouter();

  const [token, setToken] = useState('');

  const initAuth = () => {
    // NOTE: token을 받아 해당 데이터를 다시 cookie에 저장하는 유틸
    setAuthData();
  };

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
    const accessToken = getAccessToken();

    if (!accessToken) return;

    try {
      setToken(accessToken);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  return {
    isUserLoggedIn: !!token,
    initAuth,
    logout,
    guardRoute
  };
};
