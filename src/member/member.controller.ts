import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ResponseService } from 'src/common/reponse/reponse.service';
import { Response } from 'express';
import { EditMemberDto } from './dto/edit-member.dto';

@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly responseService: ResponseService,
  ) {}

  /* 수강생 등록 */
  @Post()
  async createMember(
    @Res() res: Response,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    const newMember = await this.memberService.createMember(createMemberDto);
    this.responseService.success(res, '수강생 등록 성공', newMember);
  }

  /* 수강생 수정 */
  @Patch(':memberId')
  async updateMember(
    @Res() res: Response,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() editMemberDto: EditMemberDto,
  ) {
    await this.memberService.editMember(memberId, editMemberDto);
    this.responseService.success(res, '수강생 업데이트 성공');
  }

  /* 수강생 수강 취소 */
  @Delete(':memberId')
  async softDeleteMember(
    @Res() res: Response,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    await this.memberService.softDeleteMember(memberId);
    this.responseService.success(res, '수강생 수강 취소 성공');
  }
}
