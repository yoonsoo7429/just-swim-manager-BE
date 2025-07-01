import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Lecture } from 'src/lecture/entities/lecture.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Provider } from './enum/provider.enum';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
import { UserType } from 'src/user/enum/user-type.enum';
import { Status } from 'src/common/enum/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  /* user 확인 */
  async validateUser(email: string, provider: Provider): Promise<User | null> {
    const exUser = await this.userRepository.findUserByEmail(email, provider);
    if (!exUser) {
      return null;
    }
    return exUser;
  }

  /* JWT 생성 */
  async generateJwtToken(userId: number): Promise<string> {
    return this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }

  /* 고객 정보 생성 */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  /* 고객 추가 정보 입력 */
  async completeUserInfo(userId: number, editUserDto: EditUserDto) {
    if (editUserDto.userType === UserType.INSTRUCTOR) {
      const instructorStatus = Status.PENDING;
      await this.userRepository.editUser(userId, editUserDto, instructorStatus);
    }
    return await this.userRepository.editUser(userId, editUserDto);
  }
}
