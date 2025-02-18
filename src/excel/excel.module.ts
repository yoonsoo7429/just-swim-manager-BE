import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { MulterModule } from '@nestjs/platform-express';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [MulterModule.register({ dest: './excel' }), CustomerModule],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
