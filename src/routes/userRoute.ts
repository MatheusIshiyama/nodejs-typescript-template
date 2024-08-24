import { Router } from 'express';

import { UserController } from '@controllers/userController';
import { AppRouter } from '@interfaces/RouteInterface';
import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/userService';

const publicRouter: Router = Router();
const privateRouter: Router = Router();

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

const userController: UserController = new UserController(userService);

publicRouter.route('/users').post(userController.createUser).get(userController.getUsers);

privateRouter.route('/users/:userId').get(userController.getUserById);

export const userRoutes: AppRouter = { public: publicRouter, private: privateRouter };
