import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { LectureType } from '../enum/lecture-type.enum';
import { DayOfWeek } from 'src/common/enum/day-of-week.enum';
import { Type } from 'class-transformer';

export class CreateLectureDto {
  @IsNotEmpty()
  @IsEnum(LectureType)
  lectureType: LectureType;

  @IsNotEmpty()
  @IsString()
  lectureTitle: string;

  @IsNotEmpty()
  @IsString()
  lectureContent: string;

  @IsNotEmpty()
  @IsString()
  lectureLocation: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lectureStartDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lectureEndDate?: Date;

  @IsNotEmpty()
  @IsString()
  lectureStartTime: string;

  @IsNotEmpty()
  @IsString()
  lectureEndTime: string;

  @IsNotEmpty()
  @IsNumber()
  lecturePrice: number;

  @IsNotEmpty()
  @IsNumber()
  lectureCapacity: number;

  @ValidateIf((o) => o.lectureType !== LectureType.ONE_DAY)
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(DayOfWeek, { each: true })
  lectureDays?: DayOfWeek[];
}
