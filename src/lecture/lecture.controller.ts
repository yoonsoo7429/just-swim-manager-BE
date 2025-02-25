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
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Response } from 'express';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { EditLectureDto } from './dto/edit-lecture.dto';

@Controller('lecture')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly responseService: ResponseService,
  ) {}

  /* 수업 등록 */
  @Post()
  async createLecture(
    @Res() res: Response,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    const lecture = await this.lectureService.createLecture(createLectureDto);

    this.responseService.success(res, '수업 등록 성공', lecture);
  }

  /* 수업 전체 조회 */
  @Get()
  async getAllLectures(@Res() res: Response) {
    const lectures = await this.lectureService.getAllLectures();

    this.responseService.success(res, '수업 전체 조회 성공', lectures);
  }

  /* 수업 상세 조회 */
  @Get(':lectureId')
  async getLectureDetail(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ) {
    const lecture = await this.lectureService.getLectureDetail(lectureId);

    this.responseService.success(res, '수업 조회 성공', lecture);
  }

  /* 수업 수정 */
  @Patch(':lectureId')
  async editLecute(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
    @Body() editLectureDto: EditLectureDto,
  ) {
    await this.lectureService.editLecute(lectureId, editLectureDto);

    this.responseService.success(res, '수업 수정 성공');
  }

  /* 수업 삭제 (soft delete) */
  @Delete(':lectureId')
  async softDeleteLecture(
    @Res() res: Response,
    @Param('lectureId', ParseIntPipe) lectureId: number,
  ) {
    await this.lectureService.softDeleteLecture(lectureId);

    this.responseService.success(res, '수업 삭제 성공');
  }
}
