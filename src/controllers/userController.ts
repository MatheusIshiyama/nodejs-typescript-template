import { Request, Response } from 'express';

import { CreateUserDto } from '@dtos/user';
import { User } from '@models/User';
import { UserService } from '@services/userService';
import { logger } from '@utils/logger';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
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

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      const userBody: CreateUserDto = {
        username,
        email,
        password,
      };

      const usernameAlreadyInUse: User | null = await this.userService.findUserWhere({ username });

      if (usernameAlreadyInUse) return res.status(409).json({ message: 'Username already in use' });

      const emailAlreadyInUse: User | null = await this.userService.findUserWhere({ email });

      if (emailAlreadyInUse) return res.status(409).json({ message: 'Email already in use' });

      const user: User = await this.userService.createUser(userBody);

      const data: any = {
        ...user,
        password: undefined,
      };

      return res.status(201).json({ message: 'Success', data });
    } catch (error) {
      logger('ERROR', 'USER CONTROLLER - createUser', error);

      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  async getUsers(_req: Request, res: Response): Promise<Response> {
    try {
      const users: User[] = await this.userService.getUsers();

      return res.status(200).json({ message: 'Success', data: users });
    } catch (error) {
      logger('ERROR', 'USER CONTROLLER - getUsers', error);

      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      const user: User | null = await this.userService.findUserById(userId);

      if (!user) return res.status(404).json({ message: 'User not found' });

      return res.status(200).json({ message: 'Success', data: user });
    } catch (error) {
      logger('ERROR', 'USER CONTROLLER - getUserById', error);

      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
