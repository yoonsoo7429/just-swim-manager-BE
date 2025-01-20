import { IsNumber, IsOptional } from 'class-validator';

export class EditPaymentDto {
  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;
}
