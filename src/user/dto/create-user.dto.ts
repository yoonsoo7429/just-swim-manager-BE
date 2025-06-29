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
  @IsEnum(Provider)
  readonly provider: Provider;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly profileImage?: string;
}
