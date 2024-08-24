import { Router } from 'express';

import { AuthController } from '@controllers/authController';
import { AppRouter } from '@interfaces/RouteInterface';
import { schemaValidatorMiddleware } from '@middlewares/schemaValidatorMiddleware';
import { UserRepository } from '@repositories/userRepository';
import { authUserSchema, refreshTokenSchema } from '@schemas/authSchema';
import { AuthService } from '@services/authService';

const publicRouter: Router = Router();
const privateRouter: Router = Router();

const userRepository: UserRepository = new UserRepository();
const authService: AuthService = new AuthService(userRepository);
const authController: AuthController = new AuthController(authService);

publicRouter.route('/auth').post(schemaValidatorMiddleware(authUserSchema), authController.authUser);

publicRouter.route('/auth/refresh-token').post(schemaValidatorMiddleware(refreshTokenSchema), authController.refreshToken);

export const authRoutes: AppRouter = { public: publicRouter, private: privateRouter };
