import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class EditUserDto {
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;
}
