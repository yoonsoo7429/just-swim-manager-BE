import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/common/enum/status.enum';

@Injectable()
export class EnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
  ) {}

  /* 수강 신청 */
  async createEnrollment(
    userId: number,
    lectureId: number,
  ): Promise<Enrollment> {
    const enrollment = this.enrollmentRepository.create({
      customer: { userId },
      lecture: { lectureId },
    });

    return await this.enrollmentRepository.save(enrollment);
  }

  /* 수강 신청 상세 조회 */
  async findEnrollmentDetail(enrollmentId: number): Promise<Enrollment> {
    return await this.enrollmentRepository.findOne({
      where: { enrollmentId },
      relations: ['lecture', 'lecture.instructor', 'customer'],
    });
  }

  /* 수강 신청 상태 설정 */
  async updateEnrollmentStatus(
    enrollmentId: number,
    enrollmentStatus: Status,
  ): Promise<void> {
    await this.enrollmentRepository.update(
      { enrollmentId },
      { enrollmentStatus },
    );
  }

  /* 수강 신청 취소 */
  async deleteEnrollment(enrollmentId: number): Promise<void> {
    await this.enrollmentRepository.delete({ enrollmentId });
  }

  /* 수강 신청 전체 조회(admin) */
  async findAllEnrollmentsByAdmin(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      relations: ['customer', 'lecture', 'lecture.instructor'],
    });
  }

  /* 수강 신청 전체 조회 (instructor) */
  async findAllEnrollmentsByInstructor(userId: number): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { lecture: { instructor: { userId } } },
      relations: ['customer', 'lecture', 'lecture.instructor'],
    });
  }

  /* 수강 신청 전체 조회 (customer) */
  async findAllEnrollmentsByCustomer(userId: number): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      where: { customer: { userId } },
      relations: ['customer', 'lecture', 'lecture.instructor'],
    });
  }
}
