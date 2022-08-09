import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionsController } from './sessions.controller';
import { LocalStrategy } from '../../../framework/auth/local.strategy';
import { JwtStrategy } from '../../../framework/auth/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [SessionsController],
  providers: [LocalStrategy, JwtStrategy],
})
export class SessionsModule {}
