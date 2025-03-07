import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;

  @IsNotEmpty()
  @IsString()
  memberRegistrationDate: string;
}
