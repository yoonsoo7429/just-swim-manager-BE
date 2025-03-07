import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';
import { EditMemberDto } from './dto/edit-member.dto';
import { PaymentRepository } from 'src/payment/payment.repository';

import * as moment from 'moment';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  /* 수강생 정보 불러오기 */
  async findAllMembers(lectureId?: number): Promise<Member[]> {
    if (lectureId) {
      const allMembersByLectureId =
        await this.memberRepository.findAllMembersByLectureId(lectureId);
      return allMembersByLectureId;
    }
  }

  /* 수강생 등록 */
  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = await this.memberRepository.createMember(createMemberDto);

    const createPaymentDto: CreatePaymentDto = {
      userId: newMember.user.userId,
      lectureId: newMember.lecture.lectureId,
      paymentFee: '0',
      paymentDate: null,
    };

    await this.paymentRepository.createPayment(createPaymentDto);

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
