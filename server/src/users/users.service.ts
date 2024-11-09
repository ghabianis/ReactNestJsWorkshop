
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(email: string): Promise<User | undefined> {
    console.log('email===============>',email)
    return this.prisma.users.findUnique(
      {
        where: {
          email
        }, select: {
          firstName: true,
          lastName: true,
          email: true,
          id: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          password:true
        }
      }
    );
  }

  async create(data:any): Promise<User | undefined> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    console.log(hashedPassword)

    return this.prisma.users.create(
      {
      data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password : hashedPassword
        }
      }
    );
  }
}
