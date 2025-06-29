import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from 'src/common/enum/status.enum';

export class UpdateInstructorStatusDto {
  @IsNotEmpty()
  @IsEnum(Status)
  readonly instructorStatus: Status;
}
