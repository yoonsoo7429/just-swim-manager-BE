import { Injectable } from '@nestjs/common';
import { RegistrationRepository } from './registration.repository';
import { Registration } from './entity/registration.entity';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  /* 수강 신청 */
  async createRegistration(
    userId: number,
    lectureId: number,
  ): Promise<Registration> {
    return this.registrationRepository.createRegistration(userId, lectureId);
  }
}
