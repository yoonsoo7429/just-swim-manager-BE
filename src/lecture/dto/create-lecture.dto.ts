import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LectureLevel } from '../enum/lecture-level.enum';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsString()
  lectureTitle: string;

  @IsNotEmpty()
  @IsEnum(LectureLevel)
  lectureLevel: LectureLevel;

  @IsNotEmpty()
  @IsString()
  lectureDays: string;

  @IsNotEmpty()
  @IsString()
  lectureTime: string;

  @IsNotEmpty()
  @IsString()
  lectureFee: string;

  @IsNotEmpty()
  @IsNumber()
  lectureCapacity: number;

  @IsOptional()
  @IsString()
  lectureDate: string;
}
