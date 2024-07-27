import { STORAGE_KEY } from '@domains/common/constants/storageKeys';

// -------------------------------------------------------------------------------

/* Access Token: api 인가 시 필요한 token */
/* 유효 기간: 1시간 */

export function setAccessToken(token: string) {
  localStorage.setItem(STORAGE_KEY.AUTH_ACCESS_TOKEN, token);
}

export function getAccessToken() {
  return localStorage.getItem(STORAGE_KEY.AUTH_ACCESS_TOKEN);
}

export function removeAccessToken() {
  localStorage.removeItem(STORAGE_KEY.AUTH_ACCESS_TOKEN);
}

// -------------------------------------------------------------------------------

/* Refresh Token: access token 만료 후 재발급 시 필요한 token */
/* 유효 기간: 7일 */

export function setRefreshToken(token: string) {
  localStorage.setItem(STORAGE_KEY.AUTH_REFRESH_TOKEN, token);
}

export function getRefreshToken() {
  return localStorage.getItem(STORAGE_KEY.AUTH_REFRESH_TOKEN);
}

export function removeRefreshToken() {
  localStorage.removeItem(STORAGE_KEY.AUTH_REFRESH_TOKEN);
}

// -------------------------------------------------------------------------------

export function setAuthTokens({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

export function removeAuthTokens() {
  removeAccessToken();
  removeRefreshToken();
}
