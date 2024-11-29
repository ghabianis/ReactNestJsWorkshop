import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SingInCreateInput {
    @ApiProperty({ description: 'The user email', example: 'anisghabi8@gmail.com' })
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @ApiPropertyOptional({ description: 'The user password', example: 'example password' })
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

