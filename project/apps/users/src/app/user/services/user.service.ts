import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async getById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  public async toggleFollowing(
    followerId: string,
    followingId: string
  ): Promise<boolean> {
    return this.userRepository.toggleFollowing(followerId, followingId);
  }

  public async getFollowingIds(id: string): Promise<Array<string>> {
    return this.userRepository.getFollowingIds(id);
  }

  public exists = async (id: string): Promise<boolean> => {
    const user = await this.getById(id);
    return Boolean(user);
  };

  public async allExist(...ids: Array<string>): Promise<boolean> {
    const exist = await Promise.all(ids.map(this.exists));
    return exist.every((exists) => exists);
  }
}
