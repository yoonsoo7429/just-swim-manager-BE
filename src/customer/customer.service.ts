import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /* 회원 등록 */
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const newCustomer =
      await this.customerRepository.createCustomer(createCustomerDto);
    return newCustomer;
  }

  /* 전체 회원 조회 */
  async getAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAllCustomers();
  }
}
