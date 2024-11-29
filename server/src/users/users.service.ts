
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../databaseConfig/prisma/prisma.service';
import { PasswordService } from './password/password.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly passwordService: PasswordService) { }

  async findOne(email: string): Promise<User | undefined> {
    try {
      console.log('email===============>', email)
      const user = await this.prisma.users.findUnique(
        {
          where: {
            email
          },
          select: {
            firstName: true,
            lastName: true,
            email: true,
            id: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            password: true
          }
        }
      );
      return user
    } catch (error: any) {
      throw new BadRequestException(`Error Message : ${error.message}`)
    }
  }

  async create(data: any): Promise<User | undefined> {
    try {

      const hashedPassword = await this.passwordService.hashPassword(data.password)
      console.log(hashedPassword)
      const user = await this.prisma.users.create(
        {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword
          }
        }
      );
      return user;
    } catch (error: any) {
      console.error(error)
      throw new BadRequestException(`Error : ${error.message}`);
      return error;
    }
  }
}
