import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { LectureType } from '../enum/lecture-type.enum';
import { Type } from 'class-transformer';
import { DayOfWeek } from 'src/common/enum/day-of-week.enum';

export class EditLectureDto {
  @IsOptional()
  @IsEnum(LectureType)
  lectureType?: LectureType;

  @IsOptional()
  @IsString()
  lectureTitle?: string;

  @IsOptional()
  @IsString()
  lectureContent?: string;

  @IsOptional()
  @IsString()
  lectureLocation?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lectureStartDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lectureEndDate?: Date;

  @IsOptional()
  @IsString()
  lectureStartTime?: string;

  @IsOptional()
  @IsString()
  lectureEndTime?: string;

  @IsOptional()
  @IsNumber()
  lecturePrice?: number;

  @IsOptional()
  @IsNumber()
  lectureCapacity?: number;

  @ValidateIf((o) => o.lectureType !== LectureType.ONE_DAY)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(DayOfWeek, { each: true })
  lectureDays?: DayOfWeek[];
}
