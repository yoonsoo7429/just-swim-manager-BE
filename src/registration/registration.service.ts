import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationRepository } from './registration.repository';
import { Registration } from './entity/registration.entity';
import { PaymentRepository } from 'src/payment/payment.repository';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  /* 수강 신청 */
  async createRegistration(
    userId: number,
    lectureId: number,
  ): Promise<Registration> {
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

  /* 수강 신청 수정 */
  async updateRegistration(
    userId: number,
    registrationId: number,
  ): Promise<void> {
    const registration =
      await this.registrationRepository.findRegistrationDetail(registrationId);

    if (registration.lecture.user.userId === userId) {
      await this.registrationRepository.approveRegistration(registrationId);
    }
    if (registration.user.userId) {
    }
    throw new UnauthorizedException('수강 신청 수정 권한이 없습니다.');
  }
}
