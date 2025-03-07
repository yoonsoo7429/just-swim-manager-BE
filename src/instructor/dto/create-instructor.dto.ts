import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstructorDto {
  @IsNotEmpty()
  @IsString()
  workingLocation: string;

  @IsNotEmpty()
  @IsString()
  career: string;

  @IsNotEmpty()
  @IsString()
  history: string;

  @IsNotEmpty()
  @IsString()
  Introduction: string;

  @IsNotEmpty()
  @IsString()
  curriculum: string;

  @IsNotEmpty()
  @IsString()
  youtubeLink: string;

  @IsNotEmpty()
  @IsString()
  instagramLink: string;

  @IsNotEmpty()
  @IsString()
  facebookLink: string;
}
