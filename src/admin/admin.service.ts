import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/customer/customer.repository';
import { InstructorRepository } from 'src/instructor/instructor.repository';
import { UserRepository } from 'src/user/user.repository';
import { AdminRepository } from './admin.repository';
import { Status } from 'src/common/enum/status.enum';
import { UpdateInstructorStatusDto } from './dto/update-instructor-status.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly instructorRepository: InstructorRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  async getPendingInstructors() {
    return await this.adminRepository.findPendingInstructors();
  }

  async updateInstructorStatus(
    instructorId: number,
    updateInstructorStatusDto: UpdateInstructorStatusDto,
  ) {
    const instructorStatus = updateInstructorStatusDto.instructorStatus;

    return await this.adminRepository.updateInstructorStatus(
      instructorId,
      instructorStatus,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
