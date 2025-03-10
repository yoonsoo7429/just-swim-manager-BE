import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
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

  /* 처음 회원 정보 완료하기 */
  async completeUserInfo(
    userId: number,
    editUserDto: EditUserDto,
  ): Promise<void> {
    const user = await this.userRepository.findUserByPk(userId);
    if (!user) {
      throw new UnauthorizedException('회원 정보를 완성할 수 없습니다.');
    }
    if (editUserDto.userType === UserType.CUSTOMER) {
      await this.userRepository.editUser(userId, editUserDto);
      await this.customerRepository.createCustomer(userId);
    }
    if (editUserDto.userType === UserType.INSTRUCTOR) {
      if (process.env.INSTRUCTOR_KEY === editUserDto.instructorKey) {
        await this.userRepository.editUser(userId, editUserDto);
        await this.instructorRepository.createInstructor(userId);
      }
    }
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
