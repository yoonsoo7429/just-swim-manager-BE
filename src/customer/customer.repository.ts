import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { Member } from 'src/member/entity/member.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /* 변환된 회원 정보를 저장 */
  async createCustomerByXlsx(customerData: any[]): Promise<Customer[]> {
    if (!customerData || customerData.length === 0) {
      return [];
    }

    const uniquePhoneNumbers = [
      ...new Set(customerData.map((data) => data.phoneNumber)),
    ];

    const existingCustomers = await this.customerRepository
      .createQueryBuilder('customer')
      .where('customer.phoneNumber IN (:...phoneNumbers)', {
        phoneNumbers: uniquePhoneNumbers,
      })
      .withDeleted()
      .getMany();

    const restoredCustomers = existingCustomers.filter(
      (customer) => customer.customerDeletedAt !== null,
    );

    if (restoredCustomers.length > 0) {
      await this.customerRepository
        .createQueryBuilder()
        .update(Customer)
        .set({ customerDeletedAt: null })
        .where('phoneNumber IN (:...phoneNumbers)', {
          phoneNumbers: restoredCustomers.map((c) => c.phoneNumber),
        })
        .execute();
    }

    const existingPhoneNumbers = new Set(
      existingCustomers.map((c) => c.phoneNumber),
    );

    const newCustomers = customerData.filter(
      (data) => !existingPhoneNumbers.has(data.phoneNumber),
    );

    if (newCustomers.length === 0) {
      return restoredCustomers;
    }

    const savedNewCustomers = await this.customerRepository.save(newCustomers);

    return [...restoredCustomers, ...savedNewCustomers];
  }

  /* 회원 등록 */
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { name, gender, phoneNumber, birthDate, address } = createCustomerDto;
    const newCustomer = this.customerRepository.create({
      name,
      gender,
      phoneNumber,
      birthDate,
      address,
    });
    return await this.customerRepository.save(newCustomer);
  }

  /* 전체 회원 조회 */
  async findAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  /* 회원 상세 조회 */
  async findCustomerDetail(customerId: number): Promise<Customer> {
    return await this.customerRepository.findOne({
      where: { customerId },
      relations: ['member', 'member.lecture', 'payment', 'payment.lecture'],
    });
  }

  /* 회원 정보 수정 */
  async editCustomer(
    customerId: number,
    editCustomerDto: EditCustomerDto,
  ): Promise<void> {
    const { name, gender, phoneNumber, birthDate, address } = editCustomerDto;
    await this.customerRepository.update(
      { customerId },
      { name, gender, phoneNumber, birthDate, address },
    );
  }

  /* 회원 정보 삭제 (soft delete) */
  async softDeleteCustomer(customerId: number): Promise<void> {
    await this.customerRepository.manager.transaction(async (manager) => {
      await manager.update(
        Customer,
        { customerId },
        { customerDeletedAt: new Date() },
      );

      await manager.update(
        Member,
        { customer: { customerId } },
        { memberDeletedAt: new Date() },
      );
    });
  }
}
