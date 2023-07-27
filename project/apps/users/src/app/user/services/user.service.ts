import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserMemoryRepository } from '../repositories/user-memory.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserMemoryRepository) {}

  public async getById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }
}
