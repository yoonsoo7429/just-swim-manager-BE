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

  /* 수업 등록 */
  async createLecture(
    userId: number,
    createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    return this.lectureRepository.createLecture(userId, createLectureDto);
  }

  /* 수업 전체 조회 */
  async getAllLectures(userType: UserType, userId: number): Promise<Lecture[]> {
    if (userType === UserType.INSTRUCTOR) {
      return await this.lectureRepository.findAllLecturesForInsturctor(userId);
    }

    if (userType === UserType.CUSTOMER) {
      return await this.lectureRepository.findAllLecturesForCustomer(userId);
    }
  }

  /* 수업 상세 조회 */
  async getLectureDetail(userId: number, lectureId: number): Promise<Lecture> {
    const lecture = await this.lectureRepository.findLectureDetail(
      userId,
      lectureId,
    );

    if (!lecture) {
      throw new NotFoundException('조회된 강의 정보가 없습니다.');
    }

    return lecture;
  }

  /* 수업 수정 */
  async editLecture(
    userId: number,
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<void> {
    const lecture = await this.lectureRepository.findLectureDetail(
      userId,
      lectureId,
    );

    if (!lecture) {
      throw new UnauthorizedException('수업 수정 권한이 없습니다.');
    }

    await this.lectureRepository.editLecture(lectureId, editLectureDto);
  }

  /* 수업 삭제 (soft delete) */
  async softDeleteLecture(userId: number, lectureId: number): Promise<void> {
    const lecture = await this.lectureRepository.findLectureDetail(
      userId,
      lectureId,
    );

    if (!lecture) {
      throw new UnauthorizedException('수업 수정 권한이 없습니다.');
    }

    await this.lectureRepository.softDeleteLecture(lectureId);
  }
}
