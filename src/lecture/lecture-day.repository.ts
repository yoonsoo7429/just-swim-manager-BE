import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureDay } from './entities/lecture-day.entity';
import { EntityManager, Repository } from 'typeorm';
import { DayOfWeek } from 'src/common/enum/day-of-week.enum';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureDayRepository {
  constructor(
    @InjectRepository(LectureDay)
    private lectureDayRepository: Repository<LectureDay>,
  ) {}

  /* training, cohort 강의 반복 요일 생성 */
  async createLectureDay(
    manager: EntityManager,
    lectureDays: DayOfWeek[],
    lecture: Lecture,
  ) {
    const days = lectureDays.map((day) =>
      this.lectureDayRepository.create({ dayOfWeek: day, lecture }),
    );
    return await manager.getRepository(LectureDay).save(days);
  }

  /* 반복 요일 삭제 */
  async deleteLectureDay(
    manager: EntityManager,
    lectureId: number,
  ): Promise<void> {
    await manager.delete(LectureDay, { lecture: { lectureId } });
  }
}
