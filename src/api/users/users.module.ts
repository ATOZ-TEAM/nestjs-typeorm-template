import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { RegistrationModule } from './registration/registration.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../framework/auth/jwt-auth.guard';

@Module({
  imports: [SessionsModule, RegistrationModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    // { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class UsersModule {}
