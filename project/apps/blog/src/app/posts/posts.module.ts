import { Module } from '@nestjs/common';
import { BlogPostController } from './controllers/blog-post.controller';
import { BlogPostService } from './services/blog-post.service';
import { BlogPostRepository } from './repositories/blog-post.repository';
import { PostCommentsModule } from '../comments/post-comments.module';

@Module({
  imports: [PostCommentsModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
})
export class PostsModule {}
