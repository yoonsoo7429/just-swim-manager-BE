import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Member } from './entity/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { EditMemberDto } from './dto/edit-member.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  /* 수강생 정보 불러오기 lectureId를 이용해서 */
  async findAllMembersByLectureId(lectureId: number): Promise<Member[]> {
    return await this.memberRepository.find({
      where: { lecture: { lectureId } },
      relations: ['customer'],
    });
  }

  /* 수강생 등록 */
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const { customerId, lectureId, memberRegistrationDate } = createMemberDto;
    const newMember = this.memberRepository.create({
      customer: { customerId },
      lecture: { lectureId },
      memberRegistrationDate,
    });

    await this.memberRepository.save(newMember);
    return newMember;
  }

  /* 수강생 수정 */
  async editMember(
    memberId: number,
    editMemberDto: EditMemberDto,
  ): Promise<UpdateResult> {
    const { customerId, lectureId, memberRegistrationDate } = editMemberDto;
    return await this.memberRepository.update(
      { memberId },
      {
        customer: { customerId },
        lecture: { lectureId },
        memberRegistrationDate,
      },
    );
  }

  /* 수강생 수강 취소 */
  async softDeleteMember(memberId: number): Promise<UpdateResult> {
    return await this.memberRepository.update(
      { memberId },
      { memberDeletedAt: new Date() },
    );
  }
}
