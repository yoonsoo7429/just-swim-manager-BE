import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  /* 전체 조회 */
  @Get()
  async getAllPayments(@Res() res: Response) {
    const payments = await this.paymentService.getAllPayments();

    this.responseService.success(res, '결제 정보 전체 조회 성공', payments);
  }

  /* 상세 조회 */
  @Get(':paymentId')
  async getPaymentDetail(
    @Res() res: Response,
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    const payment = await this.paymentService.getPaymentDetail(paymentId);

    this.responseService.success(res, '결제 정보 상세 조회 성공', payment);
  }

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
  async updatePayment(
    @Res() res: Response,
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() editPaymentDto: EditPaymentDto,
  ) {
    await this.paymentService.updatePayment(paymentId, editPaymentDto);
    this.responseService.success(res, '결제 수정 성공');
  }

  /* 수강료 환불 */
  @Delete(':paymentId')
  async softDeletePayment(
    @Res() res: Response,
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    await this.paymentService.softDeletePayment(paymentId);
    this.responseService.success(res, '결제 환불 성공');
  }
}
