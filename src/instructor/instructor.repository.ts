import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entity/instructor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorRepository {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
  ) {}

  /* 강사 프로필 생성 */
  async createInstructor(userId: number): Promise<Instructor> {
    return await this.instructorRepository.save({ user: { userId } });
  }
}
