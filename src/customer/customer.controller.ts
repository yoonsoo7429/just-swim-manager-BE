import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Response } from 'express';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly responseService: ResponseService,
  ) {}

  /* 회원 등록 */
  @Post()
  async createCustomer(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    const newCustomer =
      await this.customerService.createCustomer(createCustomerDto);
    this.responseService.success(res, '회원 등록 성공', newCustomer);
  }

  /* 전체 회원 조회 */
  @Get()
  async getAllCustomers(@Res() res: Response) {
    const allCustomers = await this.customerService.getAllCustomers();
    this.responseService.success(res, '전체 회원 조회 성공', allCustomers);
  }

  /* 회원 상세 조회 */
  @Get(':customerId')
  async getCustomerDetail(
    @Res() res: Response,
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    const customer = await this.customerService.getCustomerDetail(customerId);
    this.responseService.success(res, '회원 조회 성공', customer);
  }

  /* 회원 정보 수정 */
  @Patch(':customerId')
  async updateCustomer(
    @Res() res: Response,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() editCustomerDto: EditCustomerDto,
  ) {
    await this.customerService.updateCustomer(customerId, editCustomerDto);

    this.responseService.success(res, '회원 정보 수정 성공');
  }

  /* 회원 정보 삭제 (soft delete) */
  @Delete(':customerId')
  async softDeleteCustomer(
    @Res() res: Response,
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    await this.customerService.softDeleteCustomer(customerId);

    this.responseService.success(res, '회원 정보 삭제 성공');
  }
}
