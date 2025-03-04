import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CustomerGender } from '../enum/customer-gender.enum';
import { CustomerProgress } from '../enum/customer-progress.enum';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CustomerGender)
  gender: CustomerGender;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEnum(CustomerProgress)
  progress: CustomerProgress;
}
