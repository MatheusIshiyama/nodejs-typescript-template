import { FindOneOptions, FindOptionsWhere, QueryRunner } from 'typeorm';

import { AppDataSource } from '@config/data-source';
import { CreateUserDto } from '@dtos/user';
import { User } from '@models/User';
import { UserRepository } from '@repositories/userRepository';
import { logger } from '@utils/logger';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async syncDatabase(createUserDto: CreateUserDto, queryRunner: QueryRunner): Promise<User | null> {
    try {
      const { username, email, password } = createUserDto;

      let user: User | null = null;

      if (username) user = await this.userRepository.findByUsername(username);

      if (!user && email) user = await this.userRepository.findByEmail(email);

      if (!user) user = this.userRepository.create(createUserDto);

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;

      const newUser: User = await this.userRepository.save(user, queryRunner);

      return newUser;
    } catch (error) {
      logger('ERROR', 'USER SERVICE - syncDatabase', error);
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User = new User();

      const { username, email, password } = createUserDto;
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;

      const newUser: User = await this.userRepository.save(user, queryRunner);

      await queryRunner.commitTransaction();

      return newUser;
    } catch (error) {
      logger('ERROR', 'USER SERVICE - createUser', error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();

      return users;
    } catch (error) {
      logger('ERROR', 'USER SERVICE - getUsers', error);
      throw error;
    }
  }

  async findUserWhere(query: FindOptionsWhere<User>, options?: FindOneOptions<User>): Promise<User | null> {
    try {
      const user: User | null = await this.userRepository.findOne(query, options);

      return user;
    } catch (error) {
      logger('ERROR', 'USER SERVICE - findUserWhere', error);
      throw error;
    }
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      const user: User | null = await this.userRepository.findById(userId);

      return user;
    } catch (error) {
      logger('ERROR', 'USER SERVICE - findUserById', error);
      throw error;
    }
  }
}
