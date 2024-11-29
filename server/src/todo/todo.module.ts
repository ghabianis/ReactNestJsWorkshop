import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/guard.service';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { DecodeJwt } from './entities/decodeJwt';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/users/password/password.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService,UsersService , PasswordService,PrismaService ,DecodeJwt ,AuthService , AuthGuard],
})
export class TodoModule {}
