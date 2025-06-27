import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from 'src/customer/customer.repository';
import { LectureRepository } from 'src/lecture/lecture.repository';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Provider } from './enum/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly lectureRepository: LectureRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /* 관리자 확인 */
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
}
