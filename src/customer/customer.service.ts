import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entity/customer.entity';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { CustomerDetail } from './type/customer-detail.type';

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

  /* 회원 상세 조회 */
  async getCustomerDetail(customerId: number): Promise<CustomerDetail> {
    const result = await this.customerRepository.findCustomerDetail(customerId);

    const customerInfo = {
      customer: {
        customerId: result.customerId,
        name: result.name,
        gender: result.gender,
        phoneNumber: result.phoneNumber,
        birthDate: result.birthDate,
        address: result.address,
        customerCreatedAt: result.customerCreatedAt,
        customerUpdatedAt: result.customerUpdatedAt,
        customerDeletedAt: result.customerDeletedAt,
      },
      lecture:
        result.member && result.member.length > 0
          ? result.member.reduce((acc: any, member: any) => {
              if (member.lecture) {
                const {
                  lectureId,
                  lectureTitle,
                  lectureLevel,
                  lectureDays,
                  lectureTime,
                  lectureFee,
                  lectureCreatedAt,
                  lectureUpdatedAt,
                  lectureDeletedAt,
                } = member.lecture;
                let lectureGroup = acc.find(
                  (group) => group.lectureId === lectureId,
                );
                if (!lectureGroup) {
                  lectureGroup = {
                    lectureId,
                    lectureTitle,
                    lectureLevel,
                    lectureDays,
                    lectureTime,
                    lectureFee,
                    lectureCreatedAt,
                    lectureUpdatedAt,
                    lectureDeletedAt,
                    member: [],
                  };
                  acc.push(lectureGroup);
                }

                // 해당 강의에 member 정보를 추가
                lectureGroup.member.push({
                  memberId: member.memberId,
                  memberRegistrationDate: member.memberRegistrationDate,
                  memberDeletedAt: member.memberDeletedAt,
                });
              }

              return acc;
            }, [])
          : [],
      payment:
        result.payment && result.payment.length > 0
          ? result.payment.map((payment) => ({
              paymentId: payment.paymentId,
              paymentFee: payment.paymentFee,
              paymentDate: payment.paymentDate,
              paymentCreatedAt: payment.paymentCreatedAt,
              paymentDeletedAt: payment.paymentDeletedAt,
              lectureTitle: payment.lecture.lectureTitle,
            }))
          : [],
    };

    return customerInfo;
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
