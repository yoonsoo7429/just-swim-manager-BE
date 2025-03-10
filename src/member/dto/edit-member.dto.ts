import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MemberProgress } from '../enum/member-progress.enum';

export class EditMemberDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;

  @IsOptional()
  @IsEnum(MemberProgress)
  memberProgress: MemberProgress;

  @IsOptional()
  @IsString()
  memberRegistrationDate: string;
}
