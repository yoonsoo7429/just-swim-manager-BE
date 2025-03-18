import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationRepository {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
  ) {}

  /* 수강 신청 */
  async createRegistration(
    userId: number,
    lectureId: number,
  ): Promise<Registration> {
    return await this.registrationRepository.save({
      user: { userId },
      lecture: { lectureId },
    });
  }

  /* 수강 신청 수정 */
  async updateRegistration(
    lectureId: number,
    newLectureId: number,
  ): Promise<void> {
    await this.registrationRepository.update(
      { lecture: { lectureId } },
      { lecture: { lectureId: newLectureId } },
    );
  }

  /* 수강 신청 조회 (강사) */
  async findAllRegistrations(userId: number): Promise<Registration[]> {
    return this.registrationRepository.find({
      where: { lecture: { user: { userId } }, deletedAt: null },
      relations: ['user', 'lecture'],
    });
  }
}
