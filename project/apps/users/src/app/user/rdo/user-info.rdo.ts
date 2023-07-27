import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoRdo {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  firstname!: string;

  @ApiProperty()
  @Expose()
  lastname!: string;
}
