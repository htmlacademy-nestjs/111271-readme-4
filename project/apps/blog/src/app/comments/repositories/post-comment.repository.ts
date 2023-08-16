import { CrudRepositoryInterface } from '@project/core';
import { PostCommentInterface } from '@project/shared/blog';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCommentRepository
  implements CrudRepositoryInterface<PostCommentInterface, number>
{
  constructor(private prismaService: PrismaService) {}

  public async create(
    item: Partial<PostCommentInterface>
  ): Promise<PostCommentInterface> {
    const created = await this.prismaService.postComment.create({
      data: item as PostCommentInterface,
    });
    return created as PostCommentInterface;
  }

  public async delete(id: number): Promise<boolean> {
    const deleted = await this.prismaService.postComment.delete({
      where: { id },
    });
    return Boolean(deleted);
  }

  public async findById(id: number): Promise<PostCommentInterface | null> {
    const comment = await this.prismaService.postComment.findFirst({
      where: { id },
    });
    return (comment as PostCommentInterface) || null;
  }

  public async findCommentsByPostId(
    postId: number
  ): Promise<Array<PostCommentInterface>> {
    return this.prismaService.postComment.findMany({ where: { postId } });
  }

  public async update(
    id: number,
    item: Partial<PostCommentInterface>
  ): Promise<PostCommentInterface | null> {
    const updated = await this.prismaService.postComment.update({
      where: { id },
      data: item,
    });
    return (updated as PostCommentInterface) || null;
  }
}
