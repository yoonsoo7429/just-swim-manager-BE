import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customer/customer.repository';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
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

  /* 회원 정보 excel로 내보내기 */
  async exportExcel(): Promise<Buffer> {
    const customers = await this.customerRepository.findAllCustomers();

    const customerData = customers.map((customer) => ({
      name: customer.name,
      gender: customer.gender,
      phoneNumber: customer.phoneNumber,
      birthDate: customer.birthDate,
      address: customer.address,
    }));

    const ws = XLSX.utils.json_to_sheet(customerData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '고객 정보');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    return excelBuffer;
  }
}
