export interface TokenPayload {
  userId: string;
}

export interface RefreshTokenPayload {
  newAccessToken: string;
  newRefreshToken: string;
}
