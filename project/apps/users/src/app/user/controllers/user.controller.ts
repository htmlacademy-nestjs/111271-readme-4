import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserInfoRdo } from '../rdo/user-info.rdo';
import { UserService } from '../services/user.service';
import { USER_MESSAGES } from '../constants/user-messages.constant';
import { fillObject } from '@project/core';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: UserInfoRdo,
  })
  @Get(':id')
  public async get(@Param('id') id: string): Promise<UserInfoRdo> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    return fillObject(UserInfoRdo, user);
  }

  // TODO: to extract followerId from the token later on
  @HttpCode(HttpStatus.OK)
  @Post(':followerId/follow/:followingId')
  public async toggleFollowing(
    @Param('followerId') followerId: string,
    @Param('followingId') followingId: string
  ): Promise<boolean> {
    if (followerId === followingId) {
      throw new BadRequestException();
    }

    const usersExist = await this.userService.allExist(followerId, followingId);
    if (!usersExist) {
      throw new BadRequestException();
    }

    return this.userService.toggleFollowing(followerId, followingId);
  }

  // TODO: to extract followerId from the token later on
  @Get(':id/following-ids')
  public async getFollowingIds(
    @Param('id') id: string
  ): Promise<Array<string>> {
    return this.userService.getFollowingIds(id);
  }
}
