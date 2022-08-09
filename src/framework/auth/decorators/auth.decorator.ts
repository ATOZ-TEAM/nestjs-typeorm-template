import { applyDecorators, ExecutionContext, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { ErrorResponse } from '../../errors/exception.filter';
import { Public } from './public.decorator';

export function Auth(arg?: false) {
  if (arg === false) {
    return applyDecorators(Public());
  } else {
    return applyDecorators(
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ type: ErrorResponse }),
    );
  }
}

const AUTH_REFRESH_CONTEXT_KEY = 'authRefresh';

export function AuthRefresh() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ type: ErrorResponse }),
    SetMetadata(AUTH_REFRESH_CONTEXT_KEY, true),
  );
}

export function isAuthRefreshContext(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return reflector.get<boolean>(AUTH_REFRESH_CONTEXT_KEY, context.getHandler());
}
