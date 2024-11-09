import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SingInCreateInput {
    @ApiProperty({ description: 'The title of the Todo', example: 'Buy groceries' })
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @ApiPropertyOptional({ description: 'A short description of the Todo', example: 'Buy milk, eggs, and bread' })
    @IsNotEmpty()
    @IsString()
    password?: string;
  
    @ApiPropertyOptional({ description: 'User First Name', example: 'Anis' })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiPropertyOptional({ description: 'User Last Name', example: 'Ghabi' })
    @IsOptional()
    @IsString()
    lastName?: string;
  
  
}

