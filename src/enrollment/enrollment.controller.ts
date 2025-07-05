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
  ParseIntPipe,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { Response } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { Status } from 'src/common/enum/status.enum';

@Controller('enrollment')
@UseGuards(RolesGuard)
export class EnrollmentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly responseService: ResponseService,
  ) {}

  /* 수강 신청 */
  @Post(':lectureId')
  @Roles(UserType.CUSTOMER)
  async createEnrollment(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ) {
    const { userId } = res.locals.user;

    const enrollment = await this.enrollmentService.createEnrollment(
      userId,
      lectureId,
    );

    return this.responseService.success(res, '수강 신청 성공', enrollment);
  }

  @Get()
  async getAllEnrollment(@Res() res: Response) {
    const { userId, userType } = res.locals.user;

    const enrollments = await this.enrollmentService.getAllEnrollments(
      userId,
      userType,
    );

    return this.responseService.success(
      res,
      '수강 신청 전체 조회',
      enrollments,
    );
  }

  @Get(':enrollmentId')
  async getEnrollmentDetail(
    @Res() res: Response,
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
  ) {
    const { userId, userType } = res.locals.user;

    const enrollment = await this.enrollmentService.getEnrollmentDetail(
      userId,
      userType,
      enrollmentId,
    );

    return this.responseService.success(res, '수강 신청 상세 조회', enrollment);
  }

  /* 수강 신청 심의 */
  @Patch(':enrollmentId')
  @Roles(UserType.ADMIN, UserType.INSTRUCTOR)
  async updateEnrollmentStatus(
    @Res() res: Response,
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
    @Body() enrollmentStatus: Status,
  ) {
    const { userId, userType } = res.locals.user;

    await this.enrollmentService.updateEnrollmentStatus(
      userId,
      enrollmentId,
      userType,
      enrollmentStatus,
    );
    return this.responseService.success(res, '수강 신청 심의 완료');
  }

  /* 수강 신청 취소 */
  @Delete(':enrollmentId')
  @Roles(UserType.ADMIN, UserType.CUSTOMER)
  async deleteEnrollment(
    @Res() res: Response,
    @Param('enrollmentId', ParseIntPipe) enrollmentId: number,
  ) {
    const { userId, userType } = res.locals.user;

    await this.enrollmentService.deleteEnrollment(
      userId,
      userType,
      enrollmentId,
    );

    return this.responseService.success(res, '수강 신청 취소 완료');
  }
}
