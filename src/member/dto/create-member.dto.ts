import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;

  @IsNotEmpty()
  @IsString()
  memberRegistrationDate: string;
}
