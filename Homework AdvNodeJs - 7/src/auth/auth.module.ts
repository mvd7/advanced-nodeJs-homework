import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from 'src/common/role-guard/roles.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'some_secret',
      signOptions: { expiresIn: '1000000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
