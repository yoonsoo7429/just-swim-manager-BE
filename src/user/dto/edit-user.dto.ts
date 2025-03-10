import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserGender } from '../enum/user-gender.enum';
import { UserType } from '../enum/user-type.enum';

export class EditUserDto {
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsString()
  instructorKey: string;
}
