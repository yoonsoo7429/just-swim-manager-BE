import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserSigninDto } from './dto/user-signin.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  /*signup */
  @Post('signup')
  async signup(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    await this.authService.signup(createUserDto);
    this.responseService.success(res, '회원 가입 성공');
  }

  /* signin */
  @Post('signin')
  async signin(@Res() res: Response, @Body() userSigninDto: UserSigninDto) {
    const token = await this.authService.signin(userSigninDto);

    // HTTP-only 쿠키에 JWT 저장
    res.cookie('authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    this.responseService.success(res, 'signin 성공', token);
  }

  /* logout */
  @Post('logout')
  adminLogout(@Res() res: Response) {
    // 쿠키 삭제
    res.clearCookie('authorization');
    this.responseService.success(res, '로그아웃 성공');
  }

  /* Dashboard 정보 전달 */
  @Get('dashboard')
  async getDashboardInfo(@Res() res: Response) {
    const { userId } = res.locals.user;
    const dashboardInfo = await this.authService.findDashboardInfo(userId);

    this.responseService.success(
      res,
      'Dashboard 정보 조회 성공',
      dashboardInfo,
    );
  }
}
