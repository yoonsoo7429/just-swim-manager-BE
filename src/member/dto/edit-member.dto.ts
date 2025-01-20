import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditMemberDto {
  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;

  @IsOptional()
  @IsString()
  memberRegistrationDate: string;
}
