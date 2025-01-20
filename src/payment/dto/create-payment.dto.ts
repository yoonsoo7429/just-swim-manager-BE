import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  lectureId: number;

  @IsNotEmpty()
  @IsString()
  paymentFee: string;

  @IsNotEmpty()
  @IsString()
  paymentDate: string;
}
