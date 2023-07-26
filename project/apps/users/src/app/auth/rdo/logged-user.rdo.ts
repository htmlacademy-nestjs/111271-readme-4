import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  firstname!: string;

  @ApiProperty()
  @Expose()
  lastname!: string;

  @ApiProperty()
  @Expose()
  email!: string;
}
