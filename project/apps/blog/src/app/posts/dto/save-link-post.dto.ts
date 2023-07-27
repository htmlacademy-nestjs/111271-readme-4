import { PostTypeEnum } from '@project/shared/blog';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SaveLinkPostDto {
  @ApiProperty({
    type: String,
    enum: [PostTypeEnum.link],
  })
  type!: PostTypeEnum.link;

  @ApiProperty()
  link!: string;

  @ApiPropertyOptional()
  description?: string;
}
