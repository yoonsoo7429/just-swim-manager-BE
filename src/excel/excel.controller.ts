import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller()
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload/excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    const extractedData = await this.excelService.uploadExcel(file.path);

    return { message: '엑셀 파일 처리 완료', data: extractedData };
  }

  @Get('export/excel')
  async exportExcel(@Res() res: Response) {
    const excelBuffer = await this.excelService.exportExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=customers.xlsx');

    res.end(excelBuffer);
  }
}
