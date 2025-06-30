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
import { LectureDayRepository } from './lecture-day.repository';
import { DataSource } from 'typeorm';
import { LectureType } from './enum/lecture-type.enum';

@Injectable()
export class LectureService {
  constructor(
    private readonly lectureRepository: LectureRepository,
    private readonly lectureDayRepository: LectureDayRepository,
    private readonly dataSource: DataSource,
  ) {}

  /* 강의 생성 */
  async createLecture(userId: number, createLectureDto: CreateLectureDto) {
    const { lectureType, lectureDays } = createLectureDto;

    return await this.dataSource.transaction(async (manager) => {
      // 1. 강의 생성
      const lecture = await this.lectureRepository.createLecture(
        manager,
        userId,
        createLectureDto,
      );

      // 2. 반복 요일 생성
      if (lectureType !== LectureType.ONE_DAY && lectureDays?.length) {
        await this.lectureDayRepository.createLectureDay(
          manager,
          lectureDays,
          lecture,
        );
      }

      return lecture;
    });
  }

  /* 강의 전체 조회 */
  async getAllLectures(): Promise<Lecture[]> {
    return this.lectureRepository.findAllLectures();
  }

  /* 강의 상세 조회 */
  async getLectureDetail(lectureId: number): Promise<Lecture> {
    const lecture = this.lectureRepository.findLectureDetail(lectureId);
    if (!lecture) {
      throw new NotFoundException('해당 강의를 찾을 수 없습니다.');
    }

    return lecture;
  }

  /* 강의 정보 수정 */
  async updateLecture(
    userId: number,
    userType: UserType,
    lectureId: number,
    editLectureDto: EditLectureDto,
  ): Promise<Lecture> {
    const { lectureDays, lectureType } = editLectureDto;

    return await this.dataSource.transaction(async (manager) => {
      // 1. 강의 조회 및 권한 확인
      const lecture = await this.lectureRepository.findLectureDetail(lectureId);

      if (!lecture) {
        throw new NotFoundException('해당 강의를 찾을 수 없습니다.');
      }

      const isOwner = lecture.instructor.userId === userId;
      const isAdmin = userType === UserType.ADMIN;

      if (!isOwner && !isAdmin) {
        throw new UnauthorizedException('수정 권한이 없습니다.');
      }

      // 2. 강의 정보 수정
      await this.lectureRepository.updateLecture(
        manager,
        lectureId,
        editLectureDto,
      );

      // 3. 반복 요일 수정 (ONE_DAY가 아닌 경우)
      if (lectureType !== LectureType.ONE_DAY && lectureDays?.length) {
        // 기존 요일 삭제
        await this.lectureDayRepository.deleteLectureDay(manager, lectureId);

        // 새 요일 저장
        await this.lectureDayRepository.createLectureDay(
          manager,
          lectureDays,
          lecture,
        );
      }

      return await this.lectureRepository.findLectureDetail(lectureId);
    });
  }

  /* 강의 삭제 */
  async deleteLecture(
    userId: number,
    userType: UserType,
    lectureId: number,
  ): Promise<void> {
    // 1. 강의 조회 및 권한 확인
    const lecture = await this.lectureRepository.findLectureDetail(lectureId);

    if (!lecture) {
      throw new NotFoundException('해당 강의를 찾을 수 없습니다.');
    }

    const isOwner = lecture.instructor.userId === userId;
    const isAdmin = userType === UserType.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException('삭제 권한이 없습니다.');
    }

    // 2. 강의 정보 삭제
    await this.lectureRepository.deleteLecture(lectureId);
  }
}
