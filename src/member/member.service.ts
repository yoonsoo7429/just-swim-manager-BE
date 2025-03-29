import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';
import { EditMemberDto } from './dto/edit-member.dto';
import { UserType } from 'src/user/enum/user-type.enum';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  /* 수강생 정보 불러오기 */
  async findAllMembers(userId: number, userType: UserType): Promise<Member[]> {
    if (userType === UserType.INSTRUCTOR) {
      return await this.memberRepository.findAllMembersForInstructor(userId);
    }
    if (userType === UserType.CUSTOMER) {
      return await this.memberRepository.findAllMembersForCustomer(userId);
    }
  }

  /* 수강생 정보 불러오기 */
  async findMemberDetail(memberId: number): Promise<Member> {
    return await this.memberRepository.findMemberDetail(memberId);
  }

  /* 수강생 등록 */
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = await this.memberRepository.createMember(createMemberDto);
    return newMember;
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
