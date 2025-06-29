import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstructorRepository {
  constructor(
    @InjectRepository(User)
    private instructorRepository: Repository<User>,
  ) {}
}
