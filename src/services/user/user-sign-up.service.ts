import { UserSignUpRequestDto } from '../../dto/user/user.sign-up.request.dto';
import { User } from '../../db/entities/user.entity';
import { hashSync } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

export async function userSignUpService(
  dto: UserSignUpRequestDto,
): Promise<User> {
  await emailValidation(dto.email);
  passwordValidation(dto.password);

  const user = User.create();
  User.merge(user, { ...dto });
  user.password = hashSync(dto.password, 10);
  return user.save();
}

export async function emailValidation(email: string) {
  const user = await User.findOneBy({ email });
  if (user) {
    const msg = 'email already exists.';
    throw new BadRequestException(msg);
  }
}

export function passwordValidation(password: string) {
  if (password.length < 6) {
    const msg = `비밀번호는 6자리 이상이어야 합니다.`;
    throw new BadRequestException(msg);
  }
}
