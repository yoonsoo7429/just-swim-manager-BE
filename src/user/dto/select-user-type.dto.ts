import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../enum/user-type.enum';

export class SelectUserTypeDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: UserType;
}
