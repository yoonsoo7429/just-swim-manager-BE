import { IsNotEmpty, IsString } from 'class-validator';

export class AdminSigninDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}
