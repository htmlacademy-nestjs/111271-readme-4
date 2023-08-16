import { Module } from '@nestjs/common';
import { PostCommentService } from './services/post-comment.service';
import { PostCommentRepository } from './repositories/post-comment.repository';

@Module({
  providers: [PostCommentService, PostCommentRepository],
  exports: [PostCommentService, PostCommentRepository],
})
export class PostCommentsModule {}
