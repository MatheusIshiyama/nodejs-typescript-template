import { sign, verify, SignOptions } from 'jsonwebtoken';

import { RefreshTokenPayload, TokenPayload } from '@interfaces/TokenInterface';

export const jwtSecretKey: string = process.env.TOKEN_SECRET_KEY!;
export const jwtRefreshSecretKey: string = process.env.TOKEN_REFRESH_SECRET_KEY!;

export function signToken(payload: TokenPayload, secret: string, options?: SignOptions): string {
  return sign(payload, secret, options);
}

export function verifyToken(token: string, secret: string): TokenPayload | null {
  try {
    return verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}

export function refreshToken(oldRefreshToken: string): RefreshTokenPayload | null {
  const decoded: TokenPayload | null = verifyToken(oldRefreshToken, jwtRefreshSecretKey);

  if (decoded) {
    const newAccessToken: string = signToken({ userId: decoded.userId }, jwtSecretKey, { expiresIn: '1d' });
    const newRefreshToken: string = signToken({ userId: decoded.userId }, jwtRefreshSecretKey, { expiresIn: '7d' });

    return { newAccessToken, newRefreshToken };
  }

  return null;
}
