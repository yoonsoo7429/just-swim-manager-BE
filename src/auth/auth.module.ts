import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, KakaoStrategy],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
