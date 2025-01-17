import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CustomerGender } from '../enum/customer-gender.enum';

export class EditCustomerDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEnum(CustomerGender)
  gender?: CustomerGender;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
