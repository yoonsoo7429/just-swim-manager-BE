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
import { ResponseService } from 'src/common/response/response.service';
import { EditCustomerDto } from './dto/edit-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly responseService: ResponseService,
  ) {}
}
