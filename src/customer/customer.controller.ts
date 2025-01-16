import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly reponseService: ResponseService,
  ) {}

  /* 회원 등록 */
  @Post()
  async createCustomer(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    const newCustomer =
      await this.customerService.createCustomer(createCustomerDto);
    this.reponseService.success(res, '회원 등록 성공', newCustomer);
  }

  /* 전체 회원 조회 */
  @Get()
  async getAllCustomers(@Res() res: Response) {
    const allCustomers = await this.customerService.getAllCustomers();
    this.reponseService.success(res, '전체 회원 조회 성공', allCustomers);
  }
}
