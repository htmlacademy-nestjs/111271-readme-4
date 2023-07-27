import { Module } from '@nestjs/common';
import { PostCommentService } from './services/post-comment.service';

@Module({
  providers: [PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentsModule {}
