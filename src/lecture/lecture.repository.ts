import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { EntityManager, LessThan, Repository, UpdateResult } from 'typeorm';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { EditLectureDto } from './dto/edit-lecture.dto';

@Injectable()
export class LectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  /* 강의 등록 */
  async createLecture(
    manager: EntityManager,
    userId: number,
    createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    const lecture = manager.create(Lecture, {
      ...createLectureDto,
      instructor: { userId },
    });

    return await manager.save(lecture);
  }

  /* 강의 전체 조회 */
  async findAllLectures(): Promise<Lecture[]> {
    return this.lectureRepository
      .createQueryBuilder('lecture')
      .leftJoinAndSelect('lecture.days', 'days')
      .leftJoinAndSelect('lecture.instructor', 'instructor')
      .orderBy('ISNULL(lecture.lectureStartDate)', 'ASC')
      .addOrderBy('lecture.lectureStartDate', 'DESC')
      .getMany();
  }

  /* 강의 상세 조회 */
  async findLectureDetail(lectureId: number): Promise<Lecture> {
    return this.lectureRepository.findOne({
      where: { lectureId },
      relations: ['days', 'instructor'],
    });
  }

  /* 강의 정보 수정 */
  async updateLecture(
    manager: EntityManager,
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<void> {
    await manager.update(Lecture, { lectureId }, editLectureDto);
  }

  /* 강의 삭제 */
  async deleteLecture(lectureId: number): Promise<void> {
    await this.lectureRepository.delete({ lectureId });
  }

  /* 강의 EndDate에 맞춰 지난 강의로 변경 */
  async softDeleteExpiredLectures(today: Date): Promise<void> {
    await this.lectureRepository.update(
      { lectureEndDate: LessThan(today) },
      { deletedAt: today },
    );
  }
}
