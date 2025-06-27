import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { Provider } from 'src/auth/enum/provider.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /* 회원 가입 */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  /* email로 조회 */
  async findUserByEmail(email: string, provider: Provider): Promise<User> {
    return await this.userRepository.findOne({ where: { email, provider } });
  }

  /* pk로 조회 */
  async findUserByPk(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { userId },
      relations: ['customer', 'instructor'],
    });
  }

  /* user 정보 수정 */
  async editUser(userId: number, editUserDto: EditUserDto): Promise<void> {
    await this.userRepository.update({ userId }, editUserDto);
  }
}
