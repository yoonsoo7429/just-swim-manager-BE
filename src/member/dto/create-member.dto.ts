import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MemberProgress } from '../enum/member-progress.enum';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;

  @IsNotEmpty()
  @IsEnum(MemberProgress)
  memberProgress: MemberProgress;

  @IsNotEmpty()
  @IsString()
  memberRegistrationDate: string;
}
