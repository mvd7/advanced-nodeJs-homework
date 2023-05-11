import { ApiProperty } from '@nestjs/swagger';

export class User {
  userId: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
