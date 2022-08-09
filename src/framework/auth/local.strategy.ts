import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { userLoginService } from '../../services/user/user-login.service';
import { User } from '../../db/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // 반환된 값이 req.user 에 입력됩니다.
  async validate(email: string, password: string): Promise<User> {
    return userLoginService(email, password);
  }
}
