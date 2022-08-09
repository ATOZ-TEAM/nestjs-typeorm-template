import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from '../../../framework/auth/local-auth.guard';
import { UserLoginRequestDto } from '../../../dto/user/user.login.request.dto';
import { Auth, CurrentUser } from '../../../framework/auth/decorators';
import { User } from '../../../db/entities/user.entity';
import { JwtContainer } from '../../../dto/user/jwt/jwt-container';
import { toJwtContainer } from '../../../services/user/user-login.service';
import { BaseController } from '../../base.controller';
import { ErrorResponse } from '../../../framework/errors/exception.filter';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../../dto/user/user.dto';

@ApiTags('User Session API')
@Controller('users/session')
export class SessionsController extends BaseController {
  @ApiOperation({ summary: 'Session 생성 (로그인)' })
  @ApiBody({ type: UserLoginRequestDto })
  @ApiCreatedResponse({ type: JwtContainer, description: 'created token' })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: '### 양식이 잘못됐거나 인증 정보가 맞지 않음',
  })
  @ApiNotFoundResponse({
    type: ErrorResponse,
    description: '### 주어진 정보로 사용자를 찾을 수 없음',
  })
  @Auth(false)
  @UseGuards(LocalAuthGuard)
  @Post()
  create(@CurrentUser() currentUser: User, @Res() res: Response) {
    return this.handleEndpoint(async () => {
      const jwtContainer = await toJwtContainer(currentUser);
      return this.jwtResponse(res, jwtContainer);
    });
  }

  @ApiOperation({ summary: 'Session 조회 (내 정보 조회)' })
  @ApiOkResponse({ type: UserDto })
  @Auth()
  @Get()
  show(@CurrentUser() user: User) {
    return plainToClass(UserDto, user);
  }

  @ApiOperation({ summary: 'Session 갱신 (토큰 refresh)' })
  @ApiOkResponse({ type: JwtContainer, description: 'refreshed token' })
  @Auth()
  @Put()
  update(@CurrentUser() user: User, @Res() res: Response) {
    return this.handleEndpoint(async () => {
      const jwtContainer = await toJwtContainer(user);
      return this.jwtResponse(res, jwtContainer);
    });
  }

  private jwtResponse(res: Response, jwt: JwtContainer) {
    res.setHeader('Authorization', `Bearer ${jwt.token}`);
    return res.json(jwt);
  }
}
