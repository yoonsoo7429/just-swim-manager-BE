import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminSigninDto } from './dto/admin-signin.dto';

@Injectable()
export class AuthService {
  validateAdmin(adminSigninDto: AdminSigninDto): boolean {
    const { id, key } = adminSigninDto;
    if (id !== process.env.ADMIN_ID || key !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('아이디 또는 키가 잘못되었습니다.');
    }
    return true;
  }
}
