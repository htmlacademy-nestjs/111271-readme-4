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
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  refs,
} from '@nestjs/swagger';

@ApiTags('Posts')
@ApiExtraModels(...SavePostDtoList, ...PostRdoList)
@Controller('posts')
export class BlogPostController {
  constructor(private blogPostService: BlogPostService) {}

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
  @ApiOkResponse({
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
  @ApiOkResponse({
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
}
