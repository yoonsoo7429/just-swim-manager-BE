import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || token !== 'admin-auth-token') {
      throw new UnauthorizedException('인증 토큰이 유효하지 않습니다.');
    }

    return true;
  }
}
