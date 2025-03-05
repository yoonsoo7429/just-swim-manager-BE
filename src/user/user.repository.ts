import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /* 회원 가입 */
  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  /* email로 조회 */
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  /* pk로 조회 */
  async findUserByPk(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { userId } });
  }
}
