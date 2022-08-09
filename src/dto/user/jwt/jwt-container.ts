import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class JwtContainer {
  @ApiProperty({ description: '엑세스 토큰(JWT)' })
  @Expose()
  token: string;
}
