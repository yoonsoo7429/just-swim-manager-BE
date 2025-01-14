import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /* 변환된 회원 정보를 저장 */
  async createCustomerByXlsx(customerData: any[]): Promise<Customer[]> {
    // 중복 체크
    const phoneNumbers = customerData.map((data) => data.phoneNumber);

    const existingPhoneNumbers = await this.customerRepository
      .createQueryBuilder('customer')
      .select('customer.phoneNumber')
      .where('customer.phoneNumber IN (:...phoneNumbers)', {
        phoneNumbers: customerData.map((data) => data.phoneNumber),
      })
      .getMany();

    const existingPhoneNumbersSet = new Set(
      existingPhoneNumbers.map((customer) => customer.phoneNumber),
    );

    const customersToSave = customerData.filter(
      (data) => !existingPhoneNumbersSet.has(data.phoneNumber),
    );

    if (customersToSave.length > 0) {
      // 새로운 고객 데이터 저장
      const savedCustomers = await this.customerRepository
        .createQueryBuilder()
        .insert()
        .into(Customer)
        .values(customersToSave)
        .execute();

      return savedCustomers.raw;
    }

    return [];
  }
}
