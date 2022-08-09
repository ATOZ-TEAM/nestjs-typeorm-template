import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { isAuthRefreshContext, isPublic } from './decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (isPublic(context, this.reflector)) return true;
    if (isAuthRefreshContext(context, this.reflector)) {
      JwtStrategy.permitExpiredToken(context);
    }
    return super.canActivate(context);
  }
}
