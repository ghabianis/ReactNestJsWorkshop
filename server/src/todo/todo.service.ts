import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService : PrismaService){}
  async create(createTodoDto: CreateTodoDto) {
    return await this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        isDone: createTodoDto.isDone,
        isInPorgress: createTodoDto.isInProgress
      }
    })
  }

  async findAll() {
    const response = await this.prismaService.todo.findMany();
    return response;
  }

  async findOne(id: number) {
    return await this.prismaService.todo.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.prismaService.todo.update({
      where: {id},
      data:{
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        isDone: updateTodoDto.isDone,
        isInPorgress: updateTodoDto.isInProgress
      }
    })
  }

  async remove(id: number) {
    return await this.prismaService.todo.delete({
      where:{id}
    })
  }
}
