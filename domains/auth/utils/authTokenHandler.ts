import { COOKIE_KEY } from '@domains/common/constants/cookieKeys';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

// MEMO
// 생각해보니까 redirect를 api/after/login 여기로 떨궈달라고 하고, 로그인 클릭하기 전에 쿠키에 이전 url 저장하고
// 이후에 저기 api에 떨궈졌을 때 쿠키에 저장된 url을 가지고 redirect 시켜주면 되지 않을까?
// 그리고 쿠키도 api에서 set / delete 처리해버리고
// -------------------------------------------------------------------------------

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
        setCookie(`@auth/${key}`, value);
      }
    );
  }

  deleteCookie('pk');
};

// -------------------------------------------------------------------------------

/* Access Token: api 인가 시 필요한 token */
/* 유효 기간: 1시간 */

export function getAccessToken() {
  return getCookie(COOKIE_KEY.ACCESS_TOKEN);
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
  removeAccessToken();
  removeRefreshToken();
}
