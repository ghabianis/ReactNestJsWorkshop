import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('/api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService,private prisma: PrismaService) {}

  @Post('create')
  @ApiBody({ type: CreateTodoDto }) 
  @ApiBearerAuth('access_token')
  async create(@Body() createTodoDto: CreateTodoDto) {
   try {
    const response = await this.todoService.create(createTodoDto)
    return response;
   } catch (error) {
      throw new Error(`problem occured while creating TODO! : ${error.message}`)
   }
  }

  @Get('greeting')
  async greeting() {
      try {
          const greeting = "Welcome to the Todo App Hackers 👋😁 let's dive into Nestjs, Prisma, React, Postgres 💣";
          return { data: greeting, status: 'success' };
      } catch (error) {
          throw new Error(`Failed to get greeting: ${error.message}`);
      }
  }

 

  @Get()
  async findAll() {
    try {
      const response = await this.todoService.findAll()
      return response;
     } catch (error) {
        throw new Error(`problem occured while fetching TODO! : ${error.message}`)
     }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.todoService.findOne(+id)
      return response;
     } catch (error) {
        throw new Error(`problem occured while fetching TODO by id! : ${error.message}`)
     }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      const response = await this.todoService.update(+id, updateTodoDto)
      return response;
     } catch (error) {
        throw new Error(`problem occured while updating TODO! : ${error.message}`)
     }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const response = await this.todoService.remove(+id)
      return response;
     } catch (error) {
        throw new Error(`problem occured while removing TODO! wiht id : ${id} \n error: ${error.message}`)
     }
  }
}
