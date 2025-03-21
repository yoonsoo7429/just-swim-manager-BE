import { Injectable, NotFoundException } from '@nestjs/common';
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

  /* 수강 신청 조회 (강사) */
  async findAllRegistrations(userId: number): Promise<Registration[]> {
    return this.registrationRepository.find({
      where: { lecture: { user: { userId } }, deletedAt: null, approve: false },
      relations: ['user', 'lecture', 'payment'],
    });
  }

  /* 수강 신청 상세 조회 */
  async findRegistrationDetail(registrationId: number): Promise<Registration> {
    return this.registrationRepository.findOne({
      where: { registrationId },
      relations: ['user', 'lecture', 'lecture.user'],
    });
  }

  /* 수강 신청 승인 */
  async approveRegistration(registrationId: number): Promise<Registration> {
    const approveResult = await this.registrationRepository.update(
      { registrationId, approve: false },
      { approve: true },
    );

    if (approveResult.affected === 1) {
      return await this.findRegistrationDetail(registrationId);
    } else {
      throw new NotFoundException('수강 신청을 찾을 수 없습니다.');
    }
  }
}
