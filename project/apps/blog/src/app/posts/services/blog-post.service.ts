import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from '../repositories/blog-post.repository';
import { BlogPostEntity } from '../entities/blog-post.entity';
import { SavePostDto } from '../dto/save-post.dto';
import { PostListQueryModel } from '../models/post-list-query.model';

@Injectable()
export class BlogPostService {
  constructor(protected blogPostRepository: BlogPostRepository) {}

  public async get(id: number): Promise<BlogPostEntity | null> {
    const post = await this.blogPostRepository.findById(id);
    return post as BlogPostEntity | null;
  }

  public async getList(
    query: PostListQueryModel
  ): Promise<Array<BlogPostEntity>> {
    return this.blogPostRepository.getList(query);
  }

  public async exists(id: number): Promise<boolean> {
    return this.blogPostRepository.exists(id);
  }

  public async create(dto: SavePostDto): Promise<BlogPostEntity> {
    const created = await this.blogPostRepository.create(dto);
    return created;
  }

  public async update(
    id: number,
    dto: SavePostDto
  ): Promise<BlogPostEntity | null> {
    const updated = await this.blogPostRepository.update(id, dto);
    if (!updated) {
      return null;
    }

    return updated;
  }

  public async delete(id: number): Promise<boolean> {
    return this.blogPostRepository.delete(id);
  }

  public async repost(
    id: number,
    nextAuthorId: string
  ): Promise<BlogPostEntity | null> {
    return this.blogPostRepository.repost(id, nextAuthorId);
  }
}
