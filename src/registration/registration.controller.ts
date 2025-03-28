import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { Response } from 'express';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { UserType } from 'src/user/enum/user-type.enum';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly responseService: ResponseService,
  ) {}

  /* 수강 신청 */
  @Post(':lectureId')
  async createRegistration(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectrueId: number,
  ) {
    const { userId, userType } = res.locals.user;

    if (userType !== UserType.CUSTOMER) {
      throw new UnauthorizedException(
        '수강생 신청은 customer 사용자만 가능합니다.',
      );
    }

    const registration = await this.registrationService.createRegistration(
      userId,
      lectrueId,
    );

    this.responseService.success(res, '수강 신청 완료', registration);
  }

  /* 수강 신청 조회 */

  /* 수강 신청 수정 */
  @Patch(':registrationId')
  async updateRegistration(
    @Res() res: Response,
    @Param('registrationId') registrationId: number,
  ) {
    const { userId } = res.locals.user;
    await this.registrationService.updateRegistration(userId, registrationId);

    this.responseService.success(res, '수강 신청 수정 완료');
  }
}
