import { Express } from 'express';

import { authMiddleware } from '@middlewares/authMiddleware';
import { authRoutes } from '@routes/authRoute';
import { userRoutes } from '@routes/userRoute';

export const API: string = '/api';

export default (app: Express): void => {
  // ? public routes
  app.use(API, authRoutes.public);
  app.use(API, userRoutes.public);

  // ? private routes
  app.use(authMiddleware);
  app.use(API, authRoutes.private);
  app.use(API, userRoutes.private);
};
