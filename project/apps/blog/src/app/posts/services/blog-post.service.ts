import { Injectable } from '@nestjs/common';
import { BlogPostMemoryRepository } from '../repositories/blog-post-memory.repository';
import { BlogPostEntity } from '../entities/blog-post.entity';
import { SavePostDto } from '../dto/save-post.dto';

@Injectable()
export class BlogPostService {
  constructor(protected blogPostRepository: BlogPostMemoryRepository) {}

  public async get(id: string): Promise<BlogPostEntity | null> {
    const post = await this.blogPostRepository.findById(id);
    return post as BlogPostEntity | null;
  }

  public async exists(id: string): Promise<boolean> {
    const post = await this.get(id);
    return Boolean(post);
  }

  public async create(dto: SavePostDto): Promise<BlogPostEntity> {
    const created = await this.blogPostRepository.create(dto);
    return created;
  }

  public async update(
    id: string,
    dto: SavePostDto
  ): Promise<BlogPostEntity | null> {
    const updated = await this.blogPostRepository.update(id, dto);
    if (!updated) {
      return null;
    }

    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    return this.blogPostRepository.delete(id);
  }

  public async repost(
    id: string,
    nextAuthorId: string
  ): Promise<BlogPostEntity | null> {
    return this.blogPostRepository.repost(id, nextAuthorId);
  }
}
