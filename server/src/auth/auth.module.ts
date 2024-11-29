
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthGuard } from './guard/guard.service';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    GuardModule,
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
