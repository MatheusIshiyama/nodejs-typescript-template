import { QueryRunner } from 'typeorm';

import { AppDataSource } from '@config/data-source';
import userData from '@data/user-data';
import { CreateUserDto } from '@dtos/user';
import { User } from '@models/User';
import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/userService';
import { logger } from '@utils/logger';

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export async function updateUsers(): Promise<void> {
  const queryRunner: QueryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const promises: Promise<User | null>[] = userData.map((data: CreateUserDto) => userService.syncDatabase(data, queryRunner));

    await Promise.all(promises);

    await queryRunner.commitTransaction();

    logger('SUCCESS', 'USER SEED', 'User data is updated');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    logger('ERROR', 'USER SEED - updateUsers', error);
  } finally {
    await queryRunner.release();
  }
}
