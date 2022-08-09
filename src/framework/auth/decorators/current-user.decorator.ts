import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../../../dto/user/user.dto';

export const getUserFromContext = (context: ExecutionContext): UserDto => {
  const request = context.switchToHttp().getRequest();

  // CurrentUser 는 UserDto 가 됩니다.
  return request.user;
};

const getUserFromRequestFactory = (_, context: ExecutionContext) => {
  return getUserFromContext(context);
};

export const CurrentUser = createParamDecorator(getUserFromRequestFactory);
