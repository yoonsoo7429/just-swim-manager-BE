import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entity/payment.entity';
import { EditPaymentDto } from './dto/edit-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  /* 전체 조회 */
  async getAllPayments(): Promise<Payment[]> {
    return await this.paymentRepository.findAllPayments();
  }

  /* 결제 정보 상세 조회 */
  async getPaymentDetail(paymentId: number): Promise<Payment> {
    return await this.paymentRepository.findPaymentDetail(paymentId);
  }

  /* 수강료 지불 */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return await this.paymentRepository.createPayment(createPaymentDto);
  }

  /* 수강료 지불 기록 수정 */
  async updatePayment(
    paymentId: number,
    editPaymentDto: EditPaymentDto,
  ): Promise<void> {
    await this.paymentRepository.editPayment(paymentId, editPaymentDto);
  }

  /* 수강료 환불 */
  async softDeletePayment(paymentId: number): Promise<void> {
    await this.paymentRepository.softDeletePayment(paymentId);
  }
}
