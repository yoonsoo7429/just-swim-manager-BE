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
}
