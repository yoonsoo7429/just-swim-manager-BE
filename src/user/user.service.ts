import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /* pk로 조회 */
  async findUserByPk(userId: number): Promise<User> {
    return await this.userRepository.findUserByPk(userId);
  }
}
