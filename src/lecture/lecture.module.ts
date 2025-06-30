import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entity/lecture.entity';
import { LectureRepository } from './lecture.repository';
import { LectureDay } from './entity/lecture-day.entity';
import { LectureDayRepository } from './lecture-day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture, LectureDay])],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository, LectureDayRepository],
  exports: [LectureService, LectureRepository, LectureDayRepository],
})
export class LectureModule {}
