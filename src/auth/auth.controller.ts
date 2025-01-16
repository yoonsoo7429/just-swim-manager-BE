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

  @Post()
  adminSignin(@Res() res: Response, @Body() adminSigninDto: AdminSigninDto) {
    this.authService.validateAdmin(adminSigninDto);
    this.responseService.success(res, 'signin 성공', 'admin-auth-token');
  }
}
