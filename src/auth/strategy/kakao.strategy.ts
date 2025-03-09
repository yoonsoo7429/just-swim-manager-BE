import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_ID,
      clientSecret: '',
      callbackURL: '/api/Oauth/kakao/callback',
      passReqToCallback: true,
    });
  }
  async validate(
    req: Express.Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    return profile;
  }
}
