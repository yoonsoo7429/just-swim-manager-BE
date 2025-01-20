import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;
}
