import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/user.dto';
import { User } from 'src/users/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/common/local-auth/local-auth.guard';
import { Role } from 'src/users/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  async login(@Body() body: User, @Request() req) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const id = await this.authService.register(body);

    return {
      message: 'User is created',
      id: id,
    };
  }
}
