import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditPaymentDto {
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;

  @IsOptional()
  @IsString()
  paymentFee: string;

  @IsOptional()
  @IsString()
  paymentDate: string | null;
}
