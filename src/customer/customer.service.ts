import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entity/customer.entity';
import { EditCustomerDto } from './dto/edit-customer.dto';

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

  /* 회원 조회 */
  async getCustomer(customerId: number): Promise<Customer> {
    return await this.customerRepository.findCustomer(customerId);
  }

  /* 회원 정보 수정 */
  async updateCustomer(
    customerId: number,
    editCustomerDto: EditCustomerDto,
  ): Promise<void> {
    await this.customerRepository.editCustomer(customerId, editCustomerDto);
  }

  /* 회원 정보 삭제 (soft delete) */
  async softDeleteCustomer(customerId: number): Promise<void> {
    await this.customerRepository.softDeleteCustomer(customerId);
  }
}
