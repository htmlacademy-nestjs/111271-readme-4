import { InMemoryRepository } from '@project/core';
import { UserEntity } from '../entities/user.entity';
import { randomUUID } from 'node:crypto';

export class UserMemoryRepository extends InMemoryRepository<
  UserEntity,
  string
> {
  public async create(item: Partial<UserEntity>): Promise<UserEntity> {
    const user = {
      ...item,
      id: randomUUID(),
    } as UserEntity;

    this.setItem(user.id, user);

    return user;
  }

  public async update(
    id: string,
    item: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    const user = this.getItem(id);
    if (!user) {
      return null;
    }

    const updated = { ...user, ...item };
    this.setItem(id, updated);

    return updated;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.getItem(id);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.getStorageValues().find((user) => user.email === email) || null;
  }
}
