import { IsOptional, IsString } from 'class-validator';

export class EditInstructorDto {
  @IsOptional()
  @IsString()
  workingLocation: string;

  @IsOptional()
  @IsString()
  career: string;

  @IsOptional()
  @IsString()
  history: string;

  @IsOptional()
  @IsString()
  Introduction: string;

  @IsOptional()
  @IsString()
  curriculum: string;

  @IsOptional()
  @IsString()
  youtubeLink: string;

  @IsOptional()
  @IsString()
  instagramLink: string;

  @IsOptional()
  @IsString()
  facebookLink: string;
}
