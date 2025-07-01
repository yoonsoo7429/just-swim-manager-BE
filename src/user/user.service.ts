import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EditUserDto } from './dto/edit-user.dto';
import { CustomerRepository } from 'src/customer/customer.repository';
import { InstructorRepository } from 'src/instructor/instructor.repository';
import { UserType } from './enum/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly instructorRepository: InstructorRepository,
  ) {}

  /* pk로 조회 */
  async findUserByPk(userId: number): Promise<User> {
    return await this.userRepository.findUserByPk(userId);
  }

  /* user 정보 수정 */
  async editUser(userId: number, editUserDto: EditUserDto): Promise<void> {
    const user = await this.userRepository.findUserByPk(userId);
    if (!user) {
      throw new UnauthorizedException('회원 정보 수정 권한이 없습니다.');
    }
    await this.userRepository.editUser(userId, editUserDto);
  }
}
