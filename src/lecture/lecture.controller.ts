import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Response } from 'express';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { EditLectureDto } from './dto/edit-lecture.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { InstructorApprovalGuard } from 'src/common/guards/instructor-approval.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { SkipAuth } from 'src/common/decorator/skip-auth.decorator';

@Controller('lecture')
@UseGuards(RolesGuard, InstructorApprovalGuard)
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly responseService: ResponseService,
  ) {}

  /* 강의 생성 */
  @Post()
  @Roles(UserType.ADMIN, UserType.INSTRUCTOR)
  async createLecture(
    @Res() res: Response,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    const { userId } = res.locals.user;

    const lecture = await this.lectureService.createLecture(
      userId,
      createLectureDto,
    );

    return this.responseService.success(res, '강의 생성 성공', lecture);
  }

  /* 강의 조회 */
  @SkipAuth()
  @Get()
  async getAllLectures(@Res() res: Response) {
    const lectures = await this.lectureService.getAllLectures();

    return this.responseService.success(res, '전체 강의 조회 성공', lectures);
  }

  /* 강의 상세 조회 */
  @SkipAuth()
  @Get(':lectureId')
  async getLectureDetail(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ) {
    const lectureDetail = await this.lectureService.getLectureDetail(lectureId);

    return this.responseService.success(
      res,
      '강의 상세 조회 성공',
      lectureDetail,
    );
  }

  /* 강의 정보 수정 */
  @Patch(':lectureId')
  @Roles(UserType.ADMIN, UserType.INSTRUCTOR)
  async updateLecture(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
    @Body() editLectureDto: EditLectureDto,
  ) {
    const { userId, userType } = res.locals.user;

    const lecture = await this.lectureService.updateLecture(
      userId,
      userType,
      lectureId,
      editLectureDto,
    );

    return this.responseService.success(res, '강의 정보 수정 완료', lecture);
  }

  /* 강의 삭제 */
  @Delete(':lectureId')
  @Roles(UserType.ADMIN, UserType.INSTRUCTOR)
  async deleteLecture(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ) {
    const { userId, userType } = res.locals.user;

    await this.lectureService.deleteLecture(userId, userType, lectureId);

    return this.responseService.success(res, '강의 삭제 성공');
  }
}
