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
import { ResponseService } from 'src/common/response/response.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { KakaoAuthGuard } from '../common/guards/kakao.guard';
import { UserType } from 'src/user/enum/user-type.enum';
import { Provider } from './enum/provider.enum';
import { EditUserDto } from 'src/user/dto/edit-user.dto';
import { SkipAuth } from '../common/decorator/skip-auth.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService,
  ) {}

  /* kakao 소셜 로그인 (Guard를 통해 접근) */
  @SkipAuth()
  @UseGuards(KakaoAuthGuard)
  @Get('Oauth/kakao')
  async kakaoLogin(): Promise<void> {
    return;
  }

  @SkipAuth()
  @UseGuards(KakaoAuthGuard)
  @Get('Oauth/kakao/callback')
  async kakaoCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    let profile: any = req.user;
    let provider: Provider = profile.provider;
    let name: string = profile.username;
    let email: string = profile._json.kakao_account.email;
    let profileImage: string = profile._json.properties.profile_image;

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
      if (exUser.userType === UserType.INSTRUCTOR) {
        const token = await this.authService.generateJwtToken(exUser.userId);
        const query = '?token=' + token;
        res.redirect(process.env.INSTRUCTOR_REDIRECT_URI + `/${query}`);
      }
      if (exUser.userType === UserType.CUSTOMER) {
        const token = await this.authService.generateJwtToken(exUser.userId);
        const query = '?token=' + token;
        res.redirect(process.env.CUSTOMER_REDIRECT_URI + `/${query}`);
      }
    }

    // user가 없을 경우 새로 생성 후에 userType 지정으로 redirect
    if (exUser === null) {
      const newUserData: CreateUserDto = {
        provider,
        email,
        name,
        profileImage,
      };
      const newUser = await this.authService.createUser(newUserData);
      const token = await this.authService.generateJwtToken(newUser.userId);
      const query = '?token=' + token;
      res.redirect(process.env.SELECT_USERTYPE_REDIRECT_URI + `/${query}`);
    }
  }

  /* user 추가 정보 입력 */
  @Patch('userInfo')
  async completeUserInfo(
    @Res() res: Response,
    @Body() editUserDto: EditUserDto,
  ) {
    const { userId } = res.locals.user;

    await this.authService.completeUserInfo(userId, editUserDto);

    return this.responseService.success(res, '프로필 추가 정보 입력 완료');
  }
}
