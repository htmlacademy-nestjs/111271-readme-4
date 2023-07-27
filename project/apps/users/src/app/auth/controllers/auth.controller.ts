import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { fillObject } from '@project/core';
import { VerifyUserDto } from '../dto/verify-user.dto';
import { AUTH_MESSAGES } from '../constants/auth-messages.constant';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: LoggedUserRdo,
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<LoggedUserRdo> {
    const created = await this.authService.createUser(dto);
    if (!created) {
      throw new ConflictException(AUTH_MESSAGES.USER_EXISTS);
    }

    return fillObject(LoggedUserRdo, created);
  }

  @ApiOkResponse({
    type: LoggedUserRdo,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() dto: VerifyUserDto): Promise<LoggedUserRdo> {
    const user = await this.authService.verifyUser(dto);
    if (!user) {
      throw new ConflictException(AUTH_MESSAGES.WRONG_EMAIL_PASSWORD);
    }

    return fillObject(LoggedUserRdo, user);
  }
}
