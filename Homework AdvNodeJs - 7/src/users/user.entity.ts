import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  userId: number;

  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;

  role: Role;
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  role: Role;
}
