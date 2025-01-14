import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customer/customer.repository';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  /* 정리된 회원 정보 upload(excel) */
  async uploadExcel(filePath: string): Promise<any> {
    const workBook = XLSX.readFile(filePath);

    const sheetName = workBook.SheetNames[0];
    const sheet = workBook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null, raw: false });

    const customerData = rows.map((row: any) => ({
      name: row.name,
      gender: row.gender,
      phoneNumber: row.phoneNumber,
      birthDate: row.birthDate,
      address: row.address,
    }));

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.error('파일 삭제 중 오류 발생:', error);
    }

    const savedCustomers =
      await this.customerRepository.createCustomerByXlsx(customerData);

    return savedCustomers;
  }
}
