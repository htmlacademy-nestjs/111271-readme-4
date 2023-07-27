import { Injectable } from '@nestjs/common';
import { PostCommentMemoryRepository } from '../repositories/post-comment-memory.repository';
import { SavePostCommentDto } from '../dto/save-post-comment.dto';
import { PostCommentInterface } from '@project/shared/blog';

@Injectable()
export class PostCommentService {
  constructor(private postCommentRepository: PostCommentMemoryRepository) {}

  public create(
    postId: string,
    comment: SavePostCommentDto
  ): Promise<PostCommentInterface> {
    return this.postCommentRepository.create({
      ...comment,
      postId,
    });
  }

  public delete(id: string): Promise<boolean> {
    return this.postCommentRepository.delete(id);
  }
}
