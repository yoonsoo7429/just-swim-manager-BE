import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { MulterModule } from '@nestjs/platform-express';
import { CustomerModule } from 'src/customer/customer.module';
import { LectureModule } from 'src/lecture/lecture.module';

@Module({
  imports: [
    MulterModule.register({ dest: './excel' }),
    CustomerModule,
    LectureModule,
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
