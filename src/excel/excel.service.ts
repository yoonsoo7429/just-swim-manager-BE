import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customer/customer.repository';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { LectureRepository } from 'src/lecture/lecture.repository';

@Injectable()
export class ExcelService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly lectureRepository: LectureRepository,
  ) {}

  /* 회원 정보 excel로 내보내기 */
  // async exportExcel(userId?: number, lectureId?: number): Promise<Buffer> {
  //   console.log(lectureId);
  //   if (lectureId) {
  //     const lectureDetail = await this.lectureRepository.findLectureDetail(
  //       userId,
  //       lectureId,
  //     );

  //     const memberData = lectureDetail.member.map((member) => ({
  //       name: member.user.name,
  //       gender: member.user.gender,
  //       birthDate: member.user.birth,
  //       progress: member.memberProgress,
  //       phoneNumber: member.user.phoneNumber,
  //       registrationDate: member.memberRegistrationDate,
  //     }));

  //     const ws = XLSX.utils.json_to_sheet(memberData);

  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(
  //       wb,
  //       ws,
  //       `${lectureDetail.lectureTitle} 수강생 목록`,
  //     );

  //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

  //     return excelBuffer;
  //   } else {
  //     const customers = await this.customerRepository.findAllCustomers();

  //     const customerData = customers.map((customer) => ({
  //       name: customer.user.name,
  //       gender: customer.user.gender,
  //       phoneNumber: customer.user.phoneNumber,
  //       birthDate: customer.user.birth,
  //       address: customer.user.address,
  //     }));

  //     const ws = XLSX.utils.json_to_sheet(customerData);

  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, '고객 정보');

  //     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

  //     return excelBuffer;
  //   }
  // }
}
