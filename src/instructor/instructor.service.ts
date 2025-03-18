import { Injectable } from '@nestjs/common';
import { InstructorRepository } from './instructor.repository';

@Injectable()
export class InstructorService {
  constructor(private readonly instructorRepository: InstructorRepository) {}
}
