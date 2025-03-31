import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entity/payment.entity';
import { EditPaymentDto } from './dto/edit-payment.dto';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  /* 전체 조회 */
  async getAllPayments(userId: number, userType: UserType): Promise<Payment[]> {
    if (userType === UserType.INSTRUCTOR) {
      return await this.paymentRepository.findAllPaymentsForInstructor(userId);
    }
    if (userType === UserType.CUSTOMER) {
      return await this.paymentRepository.findAllPaymentsForCustomer(userId);
    }
  }

  /* 결제 정보 상세 조회 */
  async getPaymentDetail(paymentId: number): Promise<Payment> {
    return await this.paymentRepository.findPaymentDetail(paymentId);
  }

  /* 결제 정보 생성 */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await this.paymentRepository.createPayment(createPaymentDto);
  }

  /* 결제 처리 */
  async updatePayment(
    paymentId: number,
    editPaymentDto: EditPaymentDto,
  ): Promise<void> {
    await this.paymentRepository.editPayment(paymentId, editPaymentDto);
  }

  /* 결제 환불 */
  async softDeletePayment(paymentId: number): Promise<void> {
    await this.paymentRepository.softDeletePayment(paymentId);
  }
}
