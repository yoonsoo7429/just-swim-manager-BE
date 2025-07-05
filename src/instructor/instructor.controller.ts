import { Controller } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { ResponseService } from 'src/common/response/response.service';

@Controller('instructor')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly responseService: ResponseService,
  ) {}
}
