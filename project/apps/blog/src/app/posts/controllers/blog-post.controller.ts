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
  public async get(@Param('id') id: string): Promise<PostRdo> {
    const post = await this.blogPostService.get(id);
    if (!post) {
      throw new NotFoundException();
    }

    return fillPostRdo(post);
  }

  @ApiBody({
    schema: { oneOf: refs(...SavePostDtoList) },
  })
  @ApiCreatedResponse({
    schema: { oneOf: refs(...PostRdoList) },
  })
  @Post()
  public async create(@Body() dto: SavePostDto): Promise<PostRdo> {
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
    @Param('id') id: string,
    @Body() dto: SavePostDto
  ): Promise<PostRdo> {
    const post = await this.blogPostService.update(id, dto);
    if (!post) {
      throw new BadRequestException();
    }

    return fillPostRdo(post);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<void> {
    const deleted = await this.blogPostService.delete(id);
    if (!deleted) {
      throw new BadRequestException();
    }
  }

  @Post(':postId/comment')
  public async addComment(
    @Param('postId') postId: string,
    @Body() dto: SavePostCommentDto
  ): Promise<PostCommentRdo> {
    if (!(await this.blogPostService.exists(postId))) {
      throw new BadRequestException();
    }

    return this.postCommentService.create(postId, dto);
  }

  @Delete(':postId/comment/:commentId')
  public async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string
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
