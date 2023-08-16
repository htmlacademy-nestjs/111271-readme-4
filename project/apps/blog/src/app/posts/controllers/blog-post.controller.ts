import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogPostService } from '../services/blog-post.service';
import { fillPostRdo, PostRdo, PostRdoList } from '../rdo/post.rdo';
import { SavePostDto, SavePostDtoList } from '../dto/save-post.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { SavePostCommentDto } from '../../comments/dto/save-post-comment.dto';
import { PostCommentRdo } from '../../comments/rdo/post-comment.rdo';
import { PostCommentService } from '../../comments/services/post-comment.service';
import { fillObject } from '@project/core';
import { plainToInstance } from 'class-transformer';
import { PostValidationPipe } from '../pipes/post-validation.pipe';
import { PostListQueryModel } from '../models/post-list-query.model';
import { BlogPostEntity } from '../entities/blog-post.entity';

@ApiTags('Posts')
@ApiExtraModels(...SavePostDtoList, ...PostRdoList)
@Controller('posts')
export class BlogPostController {
  constructor(
    private blogPostService: BlogPostService,
    private postCommentService: PostCommentService
  ) {}

  @ApiOkResponse({
    schema: { oneOf: refs(...PostRdoList) },
  })
  @Get(':id')
  public async get(@Param('id') id: number): Promise<PostRdo> {
    const post = await this.blogPostService.get(id);
    if (!post) {
      throw new NotFoundException();
    }

    return fillPostRdo(post);
  }

  @ApiOkResponse({
    schema: {
      allOf: [
        {
          type: 'array',
          items: {
            oneOf: refs(...PostRdoList),
          },
        },
      ],
    },
  })
  @Get('/')
  public async list(
    @Query() query: PostListQueryModel
  ): Promise<Array<PostRdo>> {
    const list = await this.blogPostService.getList(query);
    return list.map(fillPostRdo);
  }

  @ApiBody({
    schema: { oneOf: refs(...SavePostDtoList) },
  })
  @ApiCreatedResponse({
    schema: { oneOf: refs(...PostRdoList) },
  })
  @Post()
  public async create(
    @Body(new PostValidationPipe()) dto: SavePostDto
  ): Promise<PostRdo> {
    const post = await this.blogPostService.create(dto);
    return fillPostRdo(post);
  }

  @ApiBody({
    schema: { oneOf: refs(...SavePostDtoList) },
  })
  @ApiCreatedResponse({
    schema: { oneOf: refs(...PostRdoList) },
  })
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body(new PostValidationPipe()) dto: SavePostDto
  ): Promise<PostRdo> {
    const post = await this.blogPostService.update(id, dto);
    if (!post) {
      throw new BadRequestException();
    }

    return fillPostRdo(post);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<void> {
    const deleted = await this.blogPostService.delete(id);
    if (!deleted) {
      throw new BadRequestException();
    }
  }

  @Get(':postId/comment')
  public async getPostComments(
    @Param('postId') postId: number
  ): Promise<Array<PostCommentRdo>> {
    const comments = await this.postCommentService.getPostComments(postId);
    return plainToInstance(PostCommentRdo, comments);
  }

  @Post(':postId/comment')
  public async addComment(
    @Param('postId') postId: number,
    @Body() dto: SavePostCommentDto
  ): Promise<PostCommentRdo> {
    if (!(await this.blogPostService.exists(postId))) {
      throw new BadRequestException();
    }

    const post = await this.postCommentService.create(postId, dto);
    return fillObject(PostCommentRdo, post);
  }

  @Delete(':postId/comment/:commentId')
  public async deleteComment(
    @Param('postId') postId: number,
    @Param('commentId') commentId: number
  ): Promise<void> {
    if (!(await this.blogPostService.exists(postId))) {
      throw new BadRequestException();
    }

    const deleted = await this.postCommentService.delete(commentId);
    if (!deleted) {
      throw new BadRequestException();
    }
  }
}
