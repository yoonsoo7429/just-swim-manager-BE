import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';
import { EditMemberDto } from './dto/edit-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  /* 수강생 등록 */
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    return await this.memberRepository.createMember(createMemberDto);
  }

  /* 수강생 수정 */
  async editMember(
    memberId: number,
    editMemberDto: EditMemberDto,
  ): Promise<void> {
    await this.memberRepository.editMember(memberId, editMemberDto);
  }

  /* 수강생 수강 취소 */
  async softDeleteMember(memberId: number): Promise<void> {
    await this.memberRepository.softDeleteMember(memberId);
  }
}
