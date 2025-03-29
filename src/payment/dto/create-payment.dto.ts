import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;

  @IsNotEmpty()
  @IsNumber()
  registrationId: number;

  @IsNotEmpty()
  @IsString()
  paymentFee: string;

  @IsOptional()
  @IsString()
  paymentDate: string | null;
}
