import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerModule } from 'src/customer/customer.module';
import { LectureModule } from 'src/lecture/lecture.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    forwardRef(() => LectureModule),
    forwardRef(() => PaymentModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
