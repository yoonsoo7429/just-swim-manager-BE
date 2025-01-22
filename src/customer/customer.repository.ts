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
      relations: ['member', 'payment'],
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
