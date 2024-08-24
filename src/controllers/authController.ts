import { Request, Response } from 'express';

import { authUserDto } from '@dtos/auth';
import { RefreshTokenPayload, TokenPayload } from '@interfaces/TokenInterface';
import { AuthService } from '@services/authService';
import { jwtRefreshSecretKey, jwtSecretKey, signToken, refreshToken } from '@utils/jsonwebtoken';
import { logger } from '@utils/logger';
import { decrypt, encrypt } from '@utils/security';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.bindMethods();
  }

  private bindMethods(): void {
    const proto: string[] = Object.getPrototypeOf(this);
    const propertyNames: string[] = Object.getOwnPropertyNames(proto);

    for (const name of propertyNames) {
      const property: any = (this as any)[name];

      // ? Bind only functions (methods) to `this`
      if (typeof property === 'function' && name !== 'constructor') {
        (this as any)[name] = property.bind(this);
      }
    }
  }

  async authUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      const authUserDto: authUserDto = {
        username,
        email,
        password,
      };

      const tokenPayload: TokenPayload | null = await this.authService.authUser(authUserDto);

      if (!tokenPayload) return res.status(404).json({ message: 'Invalid credentials' });

      const newToken: string = signToken(tokenPayload, jwtSecretKey, { expiresIn: '1d' });
      const newRefreshToken: string = signToken(tokenPayload, jwtRefreshSecretKey, { expiresIn: '7d' });

      if (!newToken || !newRefreshToken) return res.status(500).json({ message: 'Failed to generate auth token' });

      const encryptedToken: string = encrypt(newToken);
      const encryptedRefreshToken: string = encrypt(newRefreshToken);

      if (!encryptedToken || !encryptedRefreshToken) return res.status(500).json({ message: 'Failed to generate auth token' });

      return res.status(201).json({ message: 'Success', data: { token: encryptedToken, refreshToken: encryptedRefreshToken } });
    } catch (error) {
      logger('ERROR', 'AUTH CONTROLLER - authUser', error);

      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { oldRefreshToken } = req.body;

      const decryptedRefreshToken: string = decrypt(oldRefreshToken);

      if (!decryptedRefreshToken) return res.status(500).json({ message: "Failed to validate 'oldRefreshToken'" });

      const newTokens: RefreshTokenPayload | null = refreshToken(decryptedRefreshToken);

      if (!newTokens) return res.status(500).json({ message: 'Failed to generate auth token' });

      const encryptedToken: string = encrypt(newTokens.newAccessToken);
      const encryptedRefreshToken: string = encrypt(newTokens.newRefreshToken);

      if (!encryptedToken || !encryptedRefreshToken) return res.status(400).json({ message: 'Failed to generate auth token' });

      return res.status(201).json({ message: 'Success', data: { token: encryptedToken, refreshToken: encryptedRefreshToken } });
    } catch (error) {
      logger('ERROR', 'AUTH CONTROLLER - refreshToken', error);

      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
