import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { EditPaymentDto } from './dto/edit-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly responseService: ResponseService,
  ) {}

  /* 수강료 지불 */
  @Post()
  async createPayment(
    @Res() res: Response,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    const newPayment =
      await this.paymentService.createPayment(createPaymentDto);
    this.responseService.success(res, '수강료 지불 성공', newPayment);
  }

  /* 수강료 지불 기록 수정 */
  @Patch(':paymentId')
  async updateMember(
    @Res() res: Response,
    @Param('paymentId') paymentId: number,
    @Body() editPaymentDto: EditPaymentDto,
  ) {
    await this.paymentService.updatePayment(paymentId, editPaymentDto);
    this.responseService.success(res, '수강료 지불 기록 수정 성공');
  }

  /* 수강료 환불 */
  @Delete(':paymentId')
  async softDeleteMember(
    @Res() res: Response,
    @Param('paymentId') paymentId: number,
  ) {
    await this.paymentService.softDeletePayment(paymentId);
    this.responseService.success(res, '수강료 환불 성공');
  }
}
