import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerModule } from 'src/customer/customer.module';
import { LectureModule } from 'src/lecture/lecture.module';
import { PaymentModule } from 'src/payment/payment.module';
import { UserModule } from 'src/user/user.module';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { RegistrationModule } from 'src/registration/registration.module';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    CustomerModule,
    LectureModule,
    PaymentModule,
    UserModule,
    RegistrationModule,
    MemberModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, KakaoStrategy],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
