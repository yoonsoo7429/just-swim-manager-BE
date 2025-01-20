import { IsNumber, IsOptional } from 'class-validator';

export class EditMemberDto {
  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;
}
