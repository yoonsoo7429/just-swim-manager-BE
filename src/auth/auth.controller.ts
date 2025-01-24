import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  /* 관리자 signin */
  @Post('signin')
  adminSignin(@Res() res: Response, @Body() adminSigninDto: AdminSigninDto) {
    // 관리자 인증
    this.authService.validateAdmin(adminSigninDto);

    // JWT 생성
    const token = this.authService.generateJwtToken({ id: adminSigninDto.id });

    // HTTP-only 쿠키에 JWT 저장
    res.cookie('authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    this.responseService.success(res, 'signin 성공', token);
  }

  /* 관리자 logout */
  @Post('logout')
  adminLogout(@Res() res: Response) {
    // 쿠키 삭제
    res.clearCookie('authorization');
    this.responseService.success(res, '로그아웃 성공');
  }
}
