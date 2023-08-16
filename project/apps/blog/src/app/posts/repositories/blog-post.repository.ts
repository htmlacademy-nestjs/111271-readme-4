import { CrudRepositoryInterface, fillObject } from '@project/core';
import { Injectable } from '@nestjs/common';
import { BlogPostEntity } from '../entities/blog-post.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaClient, Post } from '@prisma/client';
import {
  fillPostByType,
  PostInterface,
  PostTypeEnum,
  PostTypeList,
} from '@project/shared/blog';
import { $Enums } from '.prisma/client';
import { AbstractPostDelegate } from '../../prisma/types';
import { PostListQueryModel } from '../models/post-list-query.model';

const MAX_ITEMS_LIMIT = 25;

@Injectable()
export class BlogPostRepository
  implements CrudRepositoryInterface<BlogPostEntity, number>
{
  constructor(private prismaService: PrismaService) {}

  public async create(item: Partial<BlogPostEntity>): Promise<BlogPostEntity> {
    return this.prismaService.$transaction(async (prisma) => {
      const tags = item?.tags?.map((tag) => ({ tag }));

      const basePost = await prisma.post.create({
        data: {
          ...(fillObject(PostInterface, item) as Post),
          tags: { create: tags },
        },
      });

      const postByType = {
        ...fillPostByType(item as BlogPostEntity),
        postId: basePost.id,
      };

      const client = this.getClientByType(item.type!, prisma as PrismaClient)!;
      return client.create({ data: postByType }) as BlogPostEntity;
    });
  }

  public async findById(id: number): Promise<BlogPostEntity | null> {
    return this.prismaService.$transaction(async (prisma) => {
      const basePost = await prisma.post.findFirst({
        where: { id },
        include: { tags: true },
      });

      if (!basePost) {
        return null;
      }

      const client = this.getClientByType(
        basePost.type,
        prisma as PrismaClient
      )!;
      const postByType = await client.findFirst({
        where: { postId: basePost.id },
      });
      return {
        ...basePost,
        ...postByType,
        tags: basePost.tags.map(({ tag }) => tag),
      };
    });
  }

  public async getList({
    userIds,
    tags,
    state,
    types,
    page,
    limit,
    sortBy,
    order,
  }: PostListQueryModel): Promise<Array<BlogPostEntity>> {
    return this.prismaService.$transaction(async (prisma) => {
      let where = {};
      let orderBy = {};

      if (userIds?.length) {
        where = { ...where, authorId: { in: userIds } };
      }

      if (tags?.length) {
        where = { ...where, tags: { some: { tag: { in: tags } } } };
      }

      if (types?.length) {
        where = { ...where, type: { in: types } };
      }

      if (state) {
        where = { ...where, state };
      }

      if (sortBy === 'likes' || sortBy === 'comments') {
        orderBy = { [sortBy]: { _count: order } };
      } else {
        orderBy = { [sortBy]: order };
      }

      const basePosts = await prisma.post.findMany({
        where,
        skip: page > 0 ? Math.min(limit, MAX_ITEMS_LIMIT) * (page - 1) : 0,
        orderBy,
        include: {
          tags: true,
          _count: { select: { likes: true, comments: true } },
        },
      });

      const postsByType: Array<Promise<BlogPostEntity>> = PostTypeList.map(
        async (postType) => {
          const byType = basePosts.filter((post) => post.type === postType);
          if (!byType.length) {
            return null;
          }

          const ids = byType.map((post) => post.id);
          const client = this.getClientByType(
            postType,
            prisma as PrismaClient
          )!;
          const typePosts = await client.findMany({
            where: { postId: { in: ids } },
          });

          return typePosts.map((post: BlogPostEntity & { postId: number }) => {
            const basePost = byType.find((base) => base.id === post.postId)!;
            return {
              ...basePost,
              ...post,
              tags: basePost.tags.map(({ tag }) => tag),
            } as BlogPostEntity;
          });
        }
      ).flat();
      const result = (await Promise.all(postsByType)).filter(Boolean).flat();

      const orderedResult = basePosts.map((base) => {
        return result.find((post) => post.id === base.id)!;
      });
      return orderedResult;
    });
  }

  public async update(
    id: number,
    item: Partial<BlogPostEntity>
  ): Promise<BlogPostEntity | null> {
    return this.prismaService.$transaction(async (prisma) => {
      const tags = item?.tags?.map((tag) => ({ tag }));

      const basePost = await prisma.post.update({
        where: { id },
        data: {
          ...(fillObject(PostInterface, item) as Post),
          tags: { set: tags },
        },
      });

      if (!basePost) {
        return null;
      }

      const postByType = {
        ...fillPostByType(item as BlogPostEntity),
        postId: basePost.id,
      };

      const client = this.getClientByType(item.type!, prisma as PrismaClient)!;
      return client.update({
        where: { postId: id },
        data: postByType,
      }) as BlogPostEntity;
    });
  }

  public delete(id: number): Promise<boolean> {
    return this.prismaService.$transaction(async (prisma) => {
      const deleted = await prisma.post.delete({ where: { id } });
      if (!deleted) {
        return false;
      }

      const client = this.getClientByType(
        deleted.type!,
        prisma as PrismaClient
      )!;
      await client.delete({ where: { postId: id } });
      return true;
    });
  }

  public async repost(
    id: number,
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

  public async toggleLike(
    userId: string,
    postId: number
  ): Promise<boolean | null> {
    if (!(await this.exists(postId))) {
      return null;
    }

    const likeData = { postId, userId };

    return this.prismaService.$transaction(async (prisma) => {
      const liked = await prisma.postLike.findFirst({ where: likeData });
      if (liked) {
        await prisma.postLike.delete({ where: { postId_userId: likeData } });
        return false;
      } else {
        await prisma.postLike.create({ data: likeData });
        return true;
      }
    });
  }

  public async exists(id: number) {
    const post = await this.prismaService.post.findFirst({ where: { id } });
    return Boolean(post);
  }

  private getClientByType(
    type: PostTypeEnum | $Enums.PostType,
    originalClient: PrismaClient
  ): AbstractPostDelegate | null {
    switch (type) {
      case PostTypeEnum.text:
        return originalClient.textPost;
      case PostTypeEnum.image:
        return originalClient.imagePost;
      case PostTypeEnum.video:
        return originalClient.videoPost;
      case PostTypeEnum.quotation:
        return originalClient.quotationPost;
      case PostTypeEnum.link:
        return originalClient.linkPost;
      default:
        return null;
    }
  }
}
