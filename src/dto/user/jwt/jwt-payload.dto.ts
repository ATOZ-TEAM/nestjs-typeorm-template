import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class JwtPayload {
  @ApiProperty({ description: '사용자 ID' })
  @Expose()
  id: number;

  @ApiProperty({ description: '회원명' })
  @Expose()
  name: string;

  @ApiProperty({ description: '이메일' })
  @Expose()
  email: string;

  iat?: number;
  exp?: number;
}
