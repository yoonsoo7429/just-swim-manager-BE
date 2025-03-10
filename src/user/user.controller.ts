import { Body, Controller, Get, Patch, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Response } from 'express';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}
  /* 프로필 정보 */
  @Get()
  async getUserDetail(@Res() res: Response) {
    const { userId } = res.locals.user;

    const userInfo = await this.userService.findUserByPk(userId);

    this.responseService.success(res, '프로필 조회 성공', userInfo);
  }

  /* user 정보 수정 */
  @Patch()
  async editUser(@Res() res: Response, @Body() editUserDto: EditUserDto) {
    const { userId } = res.locals.user;

    if (editUserDto.userType) {
      await this.userService.completeUserInfo(userId, editUserDto);
    }

    await this.userService.editUser(userId, editUserDto);

    this.responseService.success(res, '프로필 정보 수정 성공');
  }
}
