import { Request, Response, NextFunction } from 'express';

import { TokenPayload } from '@interfaces/TokenInterface';
import { jwtSecretKey, verifyToken } from '@utils/jsonwebtoken';
import { logger } from '@utils/logger';
import { decrypt } from '@utils/security';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'No token provided' });

  const [bearer, encryptedToken]: string[] = authorization.split(' ');

  if (bearer !== 'Bearer') return res.status(401).json({ message: 'Invalid token provided' });

  try {
    const token: string = decrypt(encryptedToken);

    if (!token) return res.status(401).json({ message: 'Invalid token provided' });

    const user: TokenPayload | null = verifyToken(token, jwtSecretKey);

    if (!user) return res.status(401).json({ message: 'Invalid token provided' });

    req.auth = { ...user };

    next();
  } catch (error) {
    logger('ERROR', 'AUTH MIDDLEWARE - authMiddleware', error);

    return res.status(401).json({ message: 'Invalid token provided' });
  }
}
