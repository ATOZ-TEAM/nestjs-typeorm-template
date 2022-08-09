import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { User } from '../../db/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { JwtContainer } from '../../dto/user/jwt/jwt-container';
import { JwtPayload } from '../../dto/user/jwt/jwt-payload.dto';
import { jwtExpiresIn, jwtSecret } from '../../config/environments';

export async function userLoginService(
  email: string,
  password: string,
): Promise<User> {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new NotFoundException('invalid email');
  }

  if (!(await compare(password, user.password))) {
    throw new UnauthorizedException('invalid password');
  }

  // POST /user/session 에서의
  // @CurrentUser() 는 여기서 정의됩니다.
  return user;
}

export async function userTokenLoginService(
  payload: JwtPayload,
): Promise<User> {
  const expireAt = new Date(payload.exp * 1000);
  const now = new Date();

  if (expireAt < now) {
    const message = '세션이 만료되었습니다.';
    throw new UnauthorizedException({ message });
  }

  const user = await User.findOne({ where: { id: payload.id } });

  if (!user) {
    throw new NotFoundException('invalid token');
  }

  return user;
}

export async function toJwtContainer(user: User): Promise<JwtContainer> {
  const { ...payload } = plainToClass(JwtPayload, user);
  const jwtService = new JwtService({
    secret: jwtSecret,
    signOptions: { expiresIn: jwtExpiresIn },
  });
  const token = jwtService.sign(payload);
  return plainToClass(JwtContainer, { token });
}
