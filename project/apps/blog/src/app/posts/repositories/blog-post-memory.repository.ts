import { InMemoryRepository } from '@project/core';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { BlogPostEntity } from '../entities/blog-post.entity';

@Injectable()
export class BlogPostMemoryRepository extends InMemoryRepository<
  BlogPostEntity,
  string
> {
  public async create(item: Partial<BlogPostEntity>): Promise<BlogPostEntity> {
    const post = {
      ...item,
      id: randomUUID(),
    } as BlogPostEntity;

    this.setItem(post.id, post);

    return post;
  }

  public async findById(id: string): Promise<BlogPostEntity | null> {
    return this.getItem(id);
  }

  public async update(
    id: string,
    item: Partial<BlogPostEntity>
  ): Promise<BlogPostEntity | null> {
    const post = this.getItem(id);
    if (!post || post.type !== item.type) {
      return null;
    }

    const updated = { ...post, ...item } as BlogPostEntity;
    this.setItem(id, updated);

    return updated;
  }

  public async repost(
    id: string,
    nextAuthorId: string
  ): Promise<BlogPostEntity | null> {
    const original = await this.findById(id);
    if (!original) {
      return null;
    }

    const repost: Partial<BlogPostEntity> = {
      ...original,
      authorId: nextAuthorId,
      originalPostId: original.id,
    };
    delete repost.id;
    return this.create(repost);
  }
}
