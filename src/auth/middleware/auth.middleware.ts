import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleWare implements NestMiddleware<Request, Response> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorizationCookies = req.cookies.authorization;
      const authorizationHeaders = req.headers.authorization;
      const authorization = authorizationCookies
        ? `Bearer ` + authorizationCookies
        : authorizationHeaders;

      // Cookie가 존재하지 않을 경우
      if (!authorization) {
        throw new UnauthorizedException('로그인이 필요한 기능입니다.');
      }

      // Cookie가 존재할 경우
      const [tokenType, tokenValue] = authorization.split(' ');
      if (tokenType !== 'Bearer') {
        res.clearCookie('authorization');
        throw new UnauthorizedException('잘못된 쿠키 형식입니다.');
      }

      const { userId } = this.jwtService.verify(tokenValue, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.findUserByPk(userId);

      if (user) {
        res.locals.user = user;
        (req as any).user = user;
        next();
      } else {
        throw new NotFoundException('사용자자 정보가 없습니다.');
      }
    } catch (error) {
      res.clearCookie('authorization');
      next(error);
    }
  }
}
