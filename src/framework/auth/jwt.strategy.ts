import { JwtPayload } from '../../dto/user/jwt/jwt-payload.dto';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../../config/environments';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { User } from '../../db/entities/user.entity';
import { userTokenLoginService } from '../../services/user/user-login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecret,
    });
  }

  // done 의 두 번째 인자로 입력된 값이 req.user 가 됩니다.
  async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
    const user = await userTokenLoginService(payload);
    return done(null, user);
  }

  static permitExpiredToken(context: ExecutionContext): void {
    const jwtService = new JwtService({ secret: jwtSecret });

    // get legacy token
    const request = context.switchToHttp().getRequest<Request>();
    const givenToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request as any);
    const payload = jwtService.decode(givenToken) as JwtPayload;
    if (!payload) throw new UnauthorizedException('토큰이 필요합니다.');

    // pass if not expired
    const expireAt = new Date(payload.exp * 1000);
    const now = new Date();
    if (expireAt > now) return;

    // make temp access token
    payload.exp = now.setDate(now.getDate() + 1) / 1000;

    // modify temp token which is permitted
    request.headers.set('Authorization', `Bearer ${jwtService.sign(payload)}`);
  }
}
