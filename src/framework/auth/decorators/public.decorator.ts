import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PUBLIC_METADATA_KEY = 'public';

export const Public = () => SetMetadata(PUBLIC_METADATA_KEY, true);

export const isPublic = (
  context: ExecutionContext,
  reflector: Reflector,
): boolean => {
  const isPublic = reflector.get<boolean>(
    PUBLIC_METADATA_KEY,
    context.getHandler(),
  );
  if (isPublic) return true;
};
