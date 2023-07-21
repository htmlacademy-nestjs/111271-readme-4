import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserInfoRdo } from '../rdo/user-info.rdo';
import { UserService } from '../services/user.service';
import { USER_MESSAGES } from '../constants/user-messages.constant';
import { fillObject } from '@project/core';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  public async get(@Param('id') id: string): Promise<UserInfoRdo> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    return fillObject(UserInfoRdo, user);
  }
}
