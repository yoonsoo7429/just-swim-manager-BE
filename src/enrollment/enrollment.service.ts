import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EnrollmentRepository } from './enrollment.repository';
import { UserType } from 'src/user/enum/user-type.enum';
import { Status } from 'src/common/enum/status.enum';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  /* 수강 신청 */
  async createEnrollment(
    userId: number,
    lectureId: number,
  ): Promise<Enrollment> {
    return await this.enrollmentRepository.createEnrollment(userId, lectureId);
  }

  async getAllEnrollments(
    userId: number,
    userType: UserType,
  ): Promise<Enrollment[]> {
    // admin
    if (userType === UserType.ADMIN) {
      return this.enrollmentRepository.findAllEnrollmentsByAdmin();
    }

    // instructor
    if (userType === UserType.INSTRUCTOR) {
      return this.enrollmentRepository.findAllEnrollmentsByInstructor(userId);
    }

    // customer
    if (userType === UserType.CUSTOMER) {
      return this.enrollmentRepository.findAllEnrollmentsByCustomer(userId);
    }

    throw new UnauthorizedException('수강 신청 조회 권한이 없습니다.');
  }

  async getEnrollmentDetail(
    userId: number,
    userType: UserType,
    enrollmentId: number,
  ): Promise<Enrollment> {
    const enrollment =
      await this.enrollmentRepository.findEnrollmentDetail(enrollmentId);

    if (!enrollment) throw new NotFoundException('수강 신청 내역이 없습니다.');

    // 권한 확인
    const isAdmin = userType === UserType.ADMIN;
    const isInstructor =
      userType === UserType.INSTRUCTOR &&
      enrollment.lecture.instructor.userId === userId;
    const isOwner =
      userType === UserType.CUSTOMER && enrollment.customer.userId === userId;

    if (!isAdmin && !isInstructor && !isOwner) {
      throw new UnauthorizedException('수강 신청 조회 권한이 없습니다.');
    }

    return enrollment;
  }

  async updateEnrollmentStatus(
    userId: number,
    enrollmentId: number,
    userType: UserType,
    enrollmentStatus: Status,
  ): Promise<void> {
    // 1. 수강 신청 조회 및 권한 확인
    const enrollment =
      await this.enrollmentRepository.findEnrollmentDetail(enrollmentId);

    if (!enrollment) {
      throw new NotFoundException('해당 수강 신청을 찾을 수 없습니다.');
    }

    const isOwner = enrollment.lecture.instructor.userId === userId;
    const isAdmin = userType === UserType.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new UnauthorizedException(
        '수강 신청에 대한 상태 설정 권한이 없습니다.',
      );
    }

    // 2. 상태 설정
    await this.enrollmentRepository.updateEnrollmentStatus(
      enrollmentId,
      enrollmentStatus,
    );
  }

  /* 수강 신청 취소*/
  async deleteEnrollment(
    userId: number,
    userType: UserType,
    enrollmentId: number,
  ): Promise<void> {
    const enrollment =
      await this.enrollmentRepository.findEnrollmentDetail(enrollmentId);

    const isAdmin = userType === UserType.ADMIN;

    if (enrollment.customer.userId !== userId && !isAdmin) {
      throw new UnauthorizedException('수강 신청을 취소할 권한이 없습니다.');
    }

    await this.enrollmentRepository.deleteEnrollment(enrollmentId);
  }
}
