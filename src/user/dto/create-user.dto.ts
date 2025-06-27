import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Provider } from 'src/auth/enum/provider.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Provider)
  provider: Provider;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  birth: string;

  @IsString()
  phoneNumber: string;
}
