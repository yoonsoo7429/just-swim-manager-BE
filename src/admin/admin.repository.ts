import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { User } from 'src/user/entity/user.entity';
import { UserType } from 'src/user/enum/user-type.enum';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(User) private adminRepostiroy: Repository<User>,
  ) {}

  /* 대기 중인 instructors 조회 */
  async findPendingInstructors() {
    const instructorStatus = Status.PENDING;
    return await this.adminRepostiroy.find({
      where: { instructorStatus },
    });
  }

  /* 대기 중인 instructor 승인 처리 */
  async updateInstructorStatus(instructorId: number, instructorStatus: Status) {
    const user = await this.adminRepostiroy.findOne({
      where: { userId: instructorId },
    });

    if (!user || user.userType !== UserType.INSTRUCTOR)
      throw new NotFoundException('대기 중인 instructor 정보가 없습니다.');

    await this.adminRepostiroy.update(
      { userId: instructorId },
      { instructorStatus },
    );
  }
}
