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
  async createLecture(createLectureDto: CreateLectureDto): Promise<Lecture> {
    const {
      lectureTitle,
      lectureLevel,
      lectureDays,
      lectureTime,
      lectureFee,
      lectureCapacity,
    } = createLectureDto;
    const newLecture = this.lectureRepository.create({
      lectureTitle,
      lectureLevel,
      lectureDays,
      lectureTime,
      lectureFee,
      lectureCapacity,
    });
    await this.lectureRepository.save(newLecture);
    return newLecture;
  }

  /* 수업 전체 조회 */
  async findAllLectures(): Promise<Lecture[]> {
    return await this.lectureRepository.find({ relations: ['member'] });
  }

  /* 수업 상세 조회 */
  async findLecture(lectureId: number): Promise<Lecture> {
    return await this.lectureRepository.findOne({
      where: { lectureId },
      relations: ['member', 'member.customer'],
    });
  }

  /* 수업 수정 */
  async editLecute(
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<UpdateResult> {
    const {
      lectureTitle,
      lectureLevel,
      lectureDays,
      lectureTime,
      lectureFee,
      lectureCapacity,
    } = editLectureDto;
    return await this.lectureRepository.update(
      { lectureId },
      {
        lectureTitle,
        lectureLevel,
        lectureDays,
        lectureTime,
        lectureFee,
        lectureCapacity,
      },
    );
  }

  /* 수업 삭제 (soft delete) */
  async softDeleteLecture(lectureId: number): Promise<UpdateResult> {
    return await this.lectureRepository.update(
      { lectureId },
      { lectureDeletedAt: new Date() },
    );
  }
}
