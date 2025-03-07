import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from 'src/customer/customer.repository';
import { LectureRepository } from 'src/lecture/lecture.repository';
import { PaymentRepository } from 'src/payment/payment.repository';
import { Customer } from 'src/customer/entity/customer.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly lectureRepository: LectureRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /* 관리자 확인 */
  async validateUser(email: string, provider: string): Promise<User | null> {
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
