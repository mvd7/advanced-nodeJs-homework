import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.enum';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
