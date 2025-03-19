import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { EditPaymentDto } from './dto/edit-payment.dto';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  /* 수강료 지불 */
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { userId, lectureId, paymentFee, paymentDate } = createPaymentDto;
    const newPayment = this.paymentRepository.create({
      user: { userId },
      lecture: { lectureId },
      paymentFee,
      paymentDate,
    });
    await this.paymentRepository.save(newPayment);
    return newPayment;
  }

  /* 수강료 지불 기록 수정 */
  async editPayment(
    paymentId: number,
    editPaymentDto: EditPaymentDto,
  ): Promise<UpdateResult> {
    const { userId, lectureId, paymentFee, paymentDate } = editPaymentDto;
    return await this.paymentRepository.update(
      { paymentId },
      {
        user: { userId },
        lecture: { lectureId },
        paymentFee,
        paymentDate,
      },
    );
  }

  /* 수강료 환불 */
  async softDeletePayment(paymentId: number): Promise<UpdateResult> {
    return await this.paymentRepository.update(
      { paymentId },
      { deletedAt: new Date() },
    );
  }

  /* 전체 결제 정보 조회 */
  async findAllPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['user', 'lecture'],
    });
  }

  /* 결제 상세 정보 조회 */
  async findPaymentDetail(paymentId: number): Promise<Payment> {
    return await this.paymentRepository.findOne({
      where: { paymentId },
      relations: ['user', 'lecture', 'registration'],
    });
  }
}
