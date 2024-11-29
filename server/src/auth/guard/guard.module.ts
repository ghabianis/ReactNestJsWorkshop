import { Module } from '@nestjs/common';
import { PrismaService } from 'src/databaseConfig/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { PasswordService } from 'src/users/password/password.service';

@Module({
    imports: [],
    providers: [AuthService,UsersService ,PrismaService , PasswordService],
    controllers: [],
    exports: [],
})
export class GuardModule { }
