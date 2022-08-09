import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserSignUpRequestDto } from '../../../dto/user/user.sign-up.request.dto';
import { userSignUpService } from '../../../services/user/user-sign-up.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../../dto/user/user.dto';
import { BaseController } from '../../base.controller';
import { ErrorResponse } from '../../../framework/errors/exception.filter';
import { Auth } from '../../../framework/auth/decorators';

@ApiTags('User API')
@Controller('users')
export class RegistrationController extends BaseController {
  @ApiOperation({ summary: 'User 생성 (회원가입)' })
  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: `
### 잘못된 요청
- 요청 양식
- 이메일 중복 여부
- 비밀번호 최소길이 (6자)
    `,
  })
  @Auth(false)
  @Post()
  create(@Body() dto: UserSignUpRequestDto) {
    return this.handleEndpoint(async () => {
      const user = await userSignUpService(dto);
      return plainToClass(UserDto, user);
    });
  }
}
