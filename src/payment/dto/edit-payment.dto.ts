import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditPaymentDto {
  @IsOptional()
  @IsNumber()
  customerId: number;

  @IsOptional()
  @IsNumber()
  lectureId: number;

  @IsOptional()
  @IsString()
  paymentFee: string;

  @IsOptional()
  @IsString()
  paymentDate: string;
}
