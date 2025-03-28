import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationRepository } from './registration.repository';
import { Registration } from './entity/registration.entity';
import { PaymentRepository } from 'src/payment/payment.repository';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { MemberRepository } from 'src/member/member.repository';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';
import * as moment from 'moment';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  /* 수강 신청 */
  async createRegistration(
    userId: number,
    lectureId: number,
  ): Promise<Registration> {
    const exRegistration =
      await this.registrationRepository.findOneRegistrationForCustomer(
        lectureId,
        userId,
      );
    if (exRegistration) {
      throw new ForbiddenException('강의에 대한 수강 신청 내역이 있습니다.');
    } else {
      // 결제 정보 생성
      const createPaymentDto: CreatePaymentDto = {
        userId: userId,
        lectureId: lectureId,
        paymentFee: '0',
        paymentDate: null,
      };

      await this.paymentRepository.createPayment(createPaymentDto);

      return this.registrationRepository.createRegistration(userId, lectureId);
    }
  }

  /* 수강 신청 수정 */
  async updateRegistration(
    userId: number,
    registrationId: number,
  ): Promise<void> {
    const registration =
      await this.registrationRepository.findRegistrationDetail(registrationId);

    if (registration.lecture.user.userId === userId) {
      const approveResult =
        await this.registrationRepository.approveRegistration(registrationId);

      if (approveResult) {
        const createMemberDto: CreateMemberDto = {
          userId: approveResult.user.userId,
          lectureId: approveResult.lecture.lectureId,
          memberProgress: approveResult.registrationProgress,
          memberRegistrationDate: moment().format('YYYY.MM.DD'),
        };
        await this.memberRepository.createMember(createMemberDto);
      }
    }
    if (registration.user.userId) {
    }
    throw new UnauthorizedException('수강 신청 수정 권한이 없습니다.');
  }
}
