import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from 'src/customer/customer.repository';
import { LectureRepository } from 'src/lecture/lecture.repository';
import { PaymentRepository } from 'src/payment/payment.repository';
import { Customer } from 'src/customer/entity/customer.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { UserSigninDto } from './dto/user-signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly lectureRepository: LectureRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /* 회원 가입 */
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const exUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (exUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }
    const user = await this.userRepository.createUser(
      createUserDto.email,
      hashedPassword,
    );
    return user;
  }

  /* 로그인 */
  async signin(userSigninDto: UserSigninDto): Promise<string> {
    const user = await this.userRepository.findUserByEmail(userSigninDto.email);

    const isPasswordValid = await bcrypt.compare(
      userSigninDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return this.jwtService.sign(
      { userId: user.userId },
      { secret: process.env.JWT_SECRET },
    );
  }

  /* 관리자 확인 */
  validateAdmin(adminSigninDto: AdminSigninDto): boolean {
    const { id, key } = adminSigninDto;
    if (id !== process.env.ADMIN_ID || key !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('아이디 또는 키가 잘못되었습니다.');
    }
    return true;
  }

  /* JWT 생성 */
  generateJwtToken(payload: { id: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  /* Dashboard 정보 조회 */
  async findDashboardInfo(userId: number): Promise<{
    customers: Customer[];
    lectures: Lecture[];
    payments: Payment[];
  }> {
    // 전체 고객 정보
    const customers = await this.customerRepository.findAllCustomers();
    // 전체 강좌 정보
    const lectures = await this.lectureRepository.findAllLectures(userId);
    // 전체 결제 정보
    const payments = await this.paymentRepository.findAllPayments();

    return { customers, lectures, payments };
  }
}
