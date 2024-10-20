import { Module } from '@nestjs/common';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService,PrismaService],
})
export class TodoModule {}
