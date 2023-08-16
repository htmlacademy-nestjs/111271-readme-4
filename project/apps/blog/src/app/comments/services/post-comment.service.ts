import { Injectable } from '@nestjs/common';
import { PostCommentRepository } from '../repositories/post-comment.repository';
import { SavePostCommentDto } from '../dto/save-post-comment.dto';
import { PostCommentInterface } from '@project/shared/blog';

@Injectable()
export class PostCommentService {
  constructor(private postCommentRepository: PostCommentRepository) {}

  public create(
    postId: number,
    comment: SavePostCommentDto
  ): Promise<PostCommentInterface> {
    return this.postCommentRepository.create({
      ...comment,
      postId,
    });
  }

  public getPostComments(postId: number): Promise<Array<PostCommentInterface>> {
    return this.postCommentRepository.findCommentsByPostId(postId);
  }

  public delete(id: number): Promise<boolean> {
    return this.postCommentRepository.delete(id);
  }
}
