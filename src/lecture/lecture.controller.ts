import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async findAllLectures(@Res() res: Response) {
    const lectures = await this.lectureService.findAllLectures();

    this.responseService.success(res, '수업 전체 조회 성공', lectures);
  }

  /* 수업 상세 조회 */
  @Get(':lectureId')
  async findLecture(
    @Res() res: Response,
    @Param('lectureId') lectureId: number,
  ) {
    const lecture = await this.lectureService.findLecture(lectureId);

    this.responseService.success(res, '수업 조회 성공', lecture);
  }

  /* 수업 수정 */
  @Patch(':lectureId')
  async editLecute(
    @Res() res: Response,
    @Param('lectureId') lectureId: number,
    @Body() editLectureDto: EditLectureDto,
  ) {
    await this.lectureService.editLecute(lectureId, editLectureDto);

    this.responseService.success(res, '수업 수정 성공');
  }

  /* 수업 삭제 (soft delete) */
  @Delete(':lectureId')
  async softDeleteLecture(
    @Res() res: Response,
    @Param('lectureId') lectureId: number,
  ) {
    await this.lectureService.softDeleteLecture(lectureId);

    this.responseService.success(res, '수업 삭제 성공');
  }
}
