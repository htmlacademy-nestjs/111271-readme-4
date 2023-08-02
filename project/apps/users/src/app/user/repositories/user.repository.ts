import { CrudRepositoryInterface } from '@project/core';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../entities/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowerModel } from '../entities/followers.model';

@Injectable()
export class UserRepository
  implements CrudRepositoryInterface<UserEntity, string>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(FollowerModel.name)
    private readonly followerModel: Model<FollowerModel>
  ) {}

  public async create(item: Partial<UserEntity>): Promise<UserEntity> {
    const user = new this.userModel(item);
    return user.save();
  }

  public async update(
    id: string,
    item: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    return this.userModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.userModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    return Boolean(deleted);
  }

  /**
   * @return {boolean} - Whether {followerId} is following {followingId}
   */
  public async toggleFollowing(
    followerId: string,
    followingId: string
  ): Promise<boolean> {
    const followCondition = { follower: followerId, following: followingId };

    const alreadyFollowing = await this.followerModel
      .findOne(followCondition)
      .exec();

    if (alreadyFollowing) {
      await this.followerModel.deleteOne(followCondition);
      return false;
    }

    const follow = new this.followerModel(followCondition);
    await follow.save();
    return true;
  }

  public async getFollowingIds(id: string): Promise<Array<string>> {
    const following = await this.followerModel.find({ follower: id }).exec();
    return following.map(({ following }) => following as unknown as string);
  }
}
