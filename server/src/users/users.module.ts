
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { PasswordService } from './password/password.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService,PrismaService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
