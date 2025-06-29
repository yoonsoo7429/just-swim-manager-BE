import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Response } from 'express';
import { UpdateInstructorStatusDto } from './dto/update-instructor-status.dto';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly responseService: ResponseService,
  ) {}

  @Roles(UserType.ADMIN)
  @Get('instructors/pending')
  async getPendingInstructors(@Res() res: Response) {
    const pendingInstructors = await this.adminService.getPendingInstructors();
    return this.responseService.success(
      res,
      '승인 대기 중인 강사 조회 성공',
      pendingInstructors,
    );
  }

  @Roles(UserType.ADMIN)
  @Patch('instructors/:instructorId/status')
  async updateInstructorStatus(
    @Res() res: Response,
    @Param('id') instructorId: number,
    @Body() updateInstructorStatusDto: UpdateInstructorStatusDto,
  ) {
    await this.adminService.updateInstructorStatus(
      instructorId,
      updateInstructorStatusDto,
    );

    return this.responseService.success(
      res,
      `${instructorId}번 강사 승인 완료`,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
