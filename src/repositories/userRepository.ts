import { FindOneOptions, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { AppDataSource } from '@config/data-source';
import { CreateUserDto } from '@dtos/user';
import { User } from '@models/User';

export class UserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  create(createUserDto: CreateUserDto): User {
    return this.userRepository.create(createUserDto);
  }

  async save(data: User, queryRunner?: QueryRunner): Promise<User> {
    if (queryRunner) return queryRunner.manager.save(data);

    return this.userRepository.save(data);
  }

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(query: FindOptionsWhere<User>, options?: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne({ where: query, ...options });
  }

  async findById(id: string, queryRunner?: QueryRunner): Promise<User | null> {
    if (queryRunner) return queryRunner.manager.findOneBy(User, { id });

    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string, queryRunner?: QueryRunner): Promise<User | null> {
    if (queryRunner) return queryRunner.manager.findOneBy(User, { username });

    return this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string, queryRunner?: QueryRunner): Promise<User | null> {
    if (queryRunner) return queryRunner.manager.findOneBy(User, { email });

    return this.userRepository.findOneBy({ email });
  }
}
