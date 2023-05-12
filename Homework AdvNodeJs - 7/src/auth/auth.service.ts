import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new NotFoundException(
        `User with username: ${username} was not found.`,
      );
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (user && isPasswordValid) {
      const { password, ...restProps } = user;

      console.log(restProps, '****************');
      return {
        ...restProps,
      };
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const userToSave = {
      username: userDto.username,
      password: bcrypt.hashSync(userDto.password, 10),
      role: userDto.role,
    };

    const id = await this.userService.save(userToSave);

    return id;
  }
}
