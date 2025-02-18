import { Injectable } from '@nestjs/common';
import { LectureRepository } from './lecture.repository';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './entity/lecture.entity';
import { EditLectureDto } from './dto/edit-lecture.dto';

@Injectable()
export class LectureService {
  constructor(private readonly lectureRepository: LectureRepository) {}

  /* 수업 등록 */
  async createLecture(createLectureDto: CreateLectureDto): Promise<Lecture> {
    return this.lectureRepository.createLecture(createLectureDto);
  }

  /* 수업 전체 조회 */
  async getAllLectures(): Promise<Lecture[]> {
    return await this.lectureRepository.findAllLectures();
  }

  /* 수업 상세 조회 */
  async getLectureDetail(lectureId: number): Promise<Lecture> {
    return await this.lectureRepository.findLectureDetail(lectureId);
  }

  /* 수업 수정 */
  async editLecute(
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<void> {
    await this.lectureRepository.editLecute(lectureId, editLectureDto);
  }

  /* 수업 삭제 (soft delete) */
  async softDeleteLecture(lectureId: number): Promise<void> {
    await this.lectureRepository.softDeleteLecture(lectureId);
  }
}
