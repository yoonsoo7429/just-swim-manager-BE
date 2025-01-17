import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  /* 관리자 확인 */
  validateAdmin(adminSigninDto: AdminSigninDto): boolean {
    const { id, key } = adminSigninDto;
    if (id !== process.env.ADMIN_ID || key !== process.env.ADMIN_KEY) {
      throw new UnauthorizedException('아이디 또는 키가 잘못되었습니다.');
    }
    return true;
  }

  /* JWT 생성 */
  generateJwtToken(payload: { id: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
