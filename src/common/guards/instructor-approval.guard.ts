import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UserType } from 'src/user/enum/user-type.enum';
import { Status } from '../enum/status.enum';

@Injectable()
export class InstructorApprovalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 관리자면 통과
    if (user.userType === UserType.ADMIN) return true;

    // 강사이면서 승인된 상태일 때만 통과
    if (
      user.userType === UserType.INSTRUCTOR &&
      user.instructorStatus === Status.APPROVED
    ) {
      return true;
    }

    throw new ForbiddenException('접근 권한이 없습니다.');
  }
}
