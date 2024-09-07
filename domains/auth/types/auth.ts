export interface AuthDataType {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  expiresIn: number;
  firstLogin: boolean;
}
