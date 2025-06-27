import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LectureRepository } from './lecture.repository';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './entity/lecture.entity';
import { EditLectureDto } from './dto/edit-lecture.dto';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}
}
