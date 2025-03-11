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

  /* 수강생 정보 불러오기 */
  async findAllMembers(userId: number): Promise<Member[]> {
    return await this.memberRepository.find({
      where: { lecture: { user: { userId } } },
      relations: ['user'],
    });
  }

  /* 수강생 정보 불러오기 */
  async findMemberDetail(memberId: number): Promise<Member> {
    return await this.memberRepository.findOne({
      where: { memberId },
      relations: ['user', 'lecture'],
    });
  }

  /* 수강생 등록 */
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const { userId, lectureId, memberRegistrationDate } = createMemberDto;
    const newMember = this.memberRepository.create({
      user: { userId },
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
    const { userId, lectureId, memberRegistrationDate } = editMemberDto;
    return await this.memberRepository.update(
      { memberId },
      {
        user: { userId },
        lecture: { lectureId },
        memberRegistrationDate,
      },
    );
  }

  /* 수강생 수강 취소 */
  async softDeleteMember(memberId: number): Promise<UpdateResult> {
    return await this.memberRepository.update(
      { memberId },
      { deletedAt: new Date() },
    );
  }
}
