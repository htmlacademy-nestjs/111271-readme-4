import { Module } from '@nestjs/common';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogPostService } from './services/blog-post.service';
import { BlogPostMemoryRepository } from './repositories/blog-post-memory.repository';
import { PostCommentsModule } from '../comments/post-comments.module';

@Module({
  imports: [PostCommentsModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostMemoryRepository],
})
export class PostsModule {}
