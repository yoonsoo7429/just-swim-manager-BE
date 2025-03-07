import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Res,
} from '@nestjs/common';
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
  /* user 정보 수정 */
  @Patch()
  async editUser(@Res() res: Response, @Body() editUserDto: EditUserDto) {
    const { userId } = res.locals.user;

    await this.userService.editUser(userId, editUserDto);

    this.responseService.success(res, '클라이언트 정보 수정 성공');
  }
}
