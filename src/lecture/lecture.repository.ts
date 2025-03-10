import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entity/lecture.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { EditLectureDto } from './dto/edit-lecture.dto';

@Injectable()
export class LectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  /* 수업 등록 */
  async createLecture(
    userId: number,
    createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    return await this.lectureRepository.save({
      user: { userId },
      ...createLectureDto,
    });
  }

  /* 수업 전체 조회 */
  async findAllLectures(userId: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({
      where: { user: { userId } },
      relations: ['member'],
    });
  }

  /* 수업 상세 조회 */
  async findLectureDetail(userId: number, lectureId: number): Promise<Lecture> {
    return await this.lectureRepository.findOne({
      where: { user: { userId }, lectureId },
      relations: ['member', 'member.user'],
    });
  }

  /* 수업 수정 */
  async editLecture(
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<UpdateResult> {
    return await this.lectureRepository.update({ lectureId }, editLectureDto);
  }

  /* 수업 삭제 (soft delete) */
  async softDeleteLecture(lectureId: number): Promise<UpdateResult> {
    return await this.lectureRepository.update(
      { lectureId },
      { deletedAt: new Date() },
    );
  }
}
