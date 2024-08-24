import { authUserDto } from '@dtos/auth';
import { TokenPayload } from '@interfaces/TokenInterface';
import { User } from '@models/User';
import { UserRepository } from '@repositories/userRepository';
import { logger } from '@utils/logger';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async authUser(authUserDto: authUserDto): Promise<TokenPayload | null> {
    try {
      const { username, email, password } = authUserDto;

      const userExists: User | null = await this.userRepository.findOne(
        {
          ...(username && { username }),
          ...(email && { email }),
        },
        { select: ['id', 'username', 'password'] }
      );

      if (userExists) {
        const validPassword: boolean = await userExists.comparePassword(password);

        return validPassword ? { userId: userExists.id } : null;
      }

      return userExists;
    } catch (error) {
      logger('ERROR', 'AUTH SERVICE - authUser', error);
      throw error;
    }
  }
}
