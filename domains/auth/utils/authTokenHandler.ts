import { COOKIE_KEY } from '@domains/common/constants/cookieKeys';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  expiresIn: number;
  firstLogin: boolean;
}

export const setAuthData = (options?: OptionsType) => {
  const pkData = getCookie('pk', options);

  if (pkData) {
    const authData: AuthDataType = JSON.parse(pkData);

    Object.entries(authData).forEach(
      ([key, value]: [string, string | number]) => {
        setCookie(`@auth/${key}`, value, options);
      }
    );
  }

  deleteCookie('pk', options);
};

export const removeAuthData = () => {
  Object.values(COOKIE_KEY).forEach(key => {
    deleteCookie(key);
  });
};

// -------------------------------------------------------------------------------

/* Access Token: api 인가 시 필요한 token */
/* 유효 기간: 1시간 */

export function getAccessToken(options?: OptionsType) {
  return getCookie(COOKIE_KEY.ACCESS_TOKEN, options);
}

export function removeAccessToken() {
  deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
}

// -------------------------------------------------------------------------------

/* Refresh Token: access token 만료 후 재발급 시 필요한 token */
/* 유효 기간: 7일 */

export function getRefreshToken() {
  return getCookie(COOKIE_KEY.REFRESH_TOKEN);
}

export function removeRefreshToken() {
  deleteCookie(COOKIE_KEY.REFRESH_TOKEN);
}

// -------------------------------------------------------------------------------

export function removeAuthTokens() {
  removeAuthData();

  removeAccessToken();
  removeRefreshToken();
}

// -------------------------------------------------------------------------------

/* Redirect Path: 로그인 후 redirect 되어야 하는 path */

export function getRedirectPath(options?: OptionsType) {
  return getCookie(COOKIE_KEY.REDIRECT_PATH, options);
}

export function setRedirectPath(path: string, options?: OptionsType) {
  return setCookie(COOKIE_KEY.REDIRECT_PATH, path, options);
}
