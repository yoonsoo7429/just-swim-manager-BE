import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [MulterModule.register({ dest: './excel' }), CustomerModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
