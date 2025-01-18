import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LectureLevel } from '../enum/lecture-level.enum';

export class EditLectureDto {
  @IsOptional()
  @IsString()
  lectureTitle?: string;

  @IsOptional()
  @IsEnum(LectureLevel)
  lectureLevel?: LectureLevel;

  @IsOptional()
  @IsString()
  lectureDays?: string;

  @IsOptional()
  @IsString()
  lectureTime?: string;

  @IsOptional()
  @IsString()
  lectureAmount?: string;
}
