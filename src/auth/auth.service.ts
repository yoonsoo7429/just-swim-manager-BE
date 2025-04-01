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
import { RegistrationRepository } from 'src/registration/registration.repository';
import { Registration } from 'src/registration/entity/registration.entity';
import { MemberRepository } from 'src/member/member.repository';
import { Member } from 'src/member/entity/member.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerRepository: CustomerRepository,
    private readonly lectureRepository: LectureRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UserRepository,
    private readonly registrationRepository: RegistrationRepository,
    private readonly memberRepository: MemberRepository,
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

  /* Dashboard 정보 조회 (강사용) */
  async findDashboardInfoForInstructor(userId: number): Promise<{
    customers: Customer[];
    lectures: Lecture[];
    payments: Payment[];
    registrations: Registration[];
  }> {
    const results = await Promise.allSettled([
      this.customerRepository.findAllCustomers(),
      this.lectureRepository.findAllLecturesForInsturctor(userId),
      this.paymentRepository.findAllPaymentsForInstructor(userId),
      this.registrationRepository.findAllRegistrationsForInstructor(userId),
    ]);

    return {
      customers: results[0].status === 'fulfilled' ? results[0].value : [],
      lectures: results[1].status === 'fulfilled' ? results[1].value : [],
      payments: results[2].status === 'fulfilled' ? results[2].value : [],
      registrations: results[3].status === 'fulfilled' ? results[3].value : [],
    };
  }

  /* Dashboard 정보 조회 (고객용) */
  async findDashboardInfoForCustomer(userId: number): Promise<{
    lectures: Member[];
    // payments: Payment[];
    // registrations: Registration[];
  }> {
    const results = await Promise.allSettled([
      this.memberRepository.findAllMembersForCustomer(userId),
      // this.paymentRepository.findAllPayments(),
      // this.registrationRepository.findAllRegistrations(userId),
    ]);

    return {
      lectures: results[0].status === 'fulfilled' ? results[0].value : [],
      // payments: results[1].status === 'fulfilled' ? results[1].value : [],
      // registrations: results[2].status === 'fulfilled' ? results[2].value : [],
    };
  }
}
