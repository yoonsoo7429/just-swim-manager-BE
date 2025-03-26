import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { KakaoAuthGuard } from './guard/kakao.guard';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  /* kakao 소셜 로그인 (Guard를 통해 접근) */
  @UseGuards(KakaoAuthGuard)
  @Get('Oauth/kakao')
  async kakaoLogin(): Promise<void> {
    return;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('Oauth/kakao/callback')
  async kakaoCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    let profile: any = req.user;
    let provider: string = profile.provider;
    let name: string = profile._json.kakao_account.name;
    let email: string = profile._json.kakao_account.email;
    // birth
    let birthYear: string = profile._json.kakao_account.birthyear;
    let birthDay: string = profile._json.kakao_account.birthday;
    let birth: string = `${birthYear}.${birthDay.substring(0, 2)}.${birthDay.substring(2)}`;
    // phoneNumber
    let phone_number: string = profile._json.kakao_account.phone_number;
    let cleanedNumber: string = phone_number.replace(/\D/g, '');
    let phoneNumber: string = `010-${cleanedNumber.substring(4, 8)}-${cleanedNumber.substring(8, 13)}`;

    const exUser = await this.authService.validateUser(email, provider);
    // user가 존재할 경우 로그인 시도
    if (exUser) {
      // userType을 선택하지 않았을 경우
      if (exUser.userType === null) {
        const token = await this.authService.generateJwtToken(exUser.userId);
        const query = '?token=' + token;
        res.redirect(process.env.SELECT_USERTYPE_REDIRECT_URI + `/${query}`);
      }
      // userType 지정되어 있을 경우 Home으로 redirect
      if (exUser.userType !== null) {
        const token = await this.authService.generateJwtToken(exUser.userId);
        const query = '?token=' + token;
        res.redirect(process.env.HOME_REDIRECT_URI + `/${query}`);
      }
    }

    // user가 없을 경우 새로 생성 후에 userType 지정으로 redirect
    if (exUser === null) {
      const newUserData: CreateUserDto = {
        provider,
        email,
        name,
        birth,
        phoneNumber,
      };
      const newUser = await this.authService.createUser(newUserData);
      const token = await this.authService.generateJwtToken(newUser.userId);
      const query = '?token=' + token;
      res.redirect(process.env.SELECT_USERTYPE_REDIRECT_URI + `/${query}`);
    }
  }

  /* Dashboard 정보 전달 */
  @Get('dashboard')
  async getDashboardInfo(@Res() res: Response) {
    const { userId, userType } = res.locals.user;

    if (userType === UserType.INSTRUCTOR) {
      const dashboardInfo =
        await this.authService.findDashboardInfoForInstructor(userId);
      this.responseService.success(
        res,
        'Dashboard(instructor) 정보 조회 성공',
        dashboardInfo,
      );
    }

    if (userType === UserType.CUSTOMER) {
      const dashboardInfo =
        await this.authService.findDashboardInfoForCustomer(userId);
      this.responseService.success(
        res,
        'Dahsboard(customer) 정보 조회 성공',
        dashboardInfo,
      );
    }
  }

  @Post('login')
  async login(
    @Res() res: Response,
    @Body('email') email: string,
    @Body('provider') provider: string,
  ) {
    const user = await this.authService.validateUser(email, provider);

    let userId: number = user.userId;
    let token: string = await this.authService.generateJwtToken(userId);

    res.cookie('authorization', token);
    this.responseService.success(res, '로그인 성공');
  }
}
