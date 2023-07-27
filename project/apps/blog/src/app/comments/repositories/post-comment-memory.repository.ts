import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@project/core';
import { randomUUID } from 'node:crypto';
import { PostCommentInterface } from '@project/shared/blog';

@Injectable()
export class PostCommentMemoryRepository extends InMemoryRepository<
  PostCommentInterface,
  string
> {
  public async create(
    item: Partial<PostCommentInterface>
  ): Promise<PostCommentInterface> {
    const comment = {
      ...item,
      id: randomUUID(),
      createdAt: new Date(),
    } as PostCommentInterface;

    this.setItem(comment.id, comment);

    return comment;
  }

  public async findById(id: string): Promise<PostCommentInterface | null> {
    return this.getItem(id);
  }

  public async update(
    id: string,
    item: Partial<PostCommentInterface>
  ): Promise<PostCommentInterface | null> {
    const comment = this.getItem(id);
    if (!comment) {
      return null;
    }

    const updated = { ...comment, ...item } as PostCommentInterface;
    this.setItem(id, updated);

    return updated;
  }
}
