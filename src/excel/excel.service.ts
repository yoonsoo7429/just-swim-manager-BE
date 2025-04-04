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

  /* 정리된 회원 정보 upload(excel) */
  // async uploadExcel(filePath: string): Promise<any> {
  //   const workBook = XLSX.readFile(filePath);

  //   const sheetName = workBook.SheetNames[0];
  //   const sheet = workBook.Sheets[sheetName];

  //   const rows = XLSX.utils.sheet_to_json(sheet, { defval: null, raw: false });

  //   const customerData = rows.map((row: any) => ({
  //     name: row.name,
  //     gender: row.gender,
  //     phoneNumber: row.phoneNumber,
  //     birthDate: row.birthDate,
  //     address: row.address,
  //   }));

  //   try {
  //     fs.unlinkSync(filePath);
  //   } catch (error) {
  //     console.error('파일 삭제 중 오류 발생:', error);
  //   }

  //   const savedCustomers =
  //     await this.customerRepository.createCustomerByXlsx(customerData);

  //   return savedCustomers;
  // }

  /* 회원 정보 excel로 내보내기 */
  async exportExcel(userId?: number, lectureId?: number): Promise<Buffer> {
    console.log(lectureId);
    if (lectureId) {
      const lectureDetail = await this.lectureRepository.findLectureDetail(
        userId,
        lectureId,
      );

      const memberData = lectureDetail.member.map((member) => ({
        name: member.user.name,
        gender: member.user.gender,
        birthDate: member.user.birth,
        progress: member.memberProgress,
        phoneNumber: member.user.phoneNumber,
        registrationDate: member.memberRegistrationDate,
      }));

      const ws = XLSX.utils.json_to_sheet(memberData);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        ws,
        `${lectureDetail.lectureTitle} 수강생 목록`,
      );

      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      return excelBuffer;
    } else {
      const customers = await this.customerRepository.findAllCustomers();

      const customerData = customers.map((customer) => ({
        name: customer.user.name,
        gender: customer.user.gender,
        phoneNumber: customer.user.phoneNumber,
        birthDate: customer.user.birth,
        address: customer.user.address,
      }));

      const ws = XLSX.utils.json_to_sheet(customerData);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '고객 정보');

      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      return excelBuffer;
    }
  }
}
