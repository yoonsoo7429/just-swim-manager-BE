import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class EditUserDto {
  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  birth: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;
}
