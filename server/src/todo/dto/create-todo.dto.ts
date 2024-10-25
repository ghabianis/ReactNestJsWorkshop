import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
    @ApiProperty({ description: 'The title of the Todo', example: 'Buy groceries' })
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @ApiPropertyOptional({ description: 'A short description of the Todo', example: 'Buy milk, eggs, and bread' })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional({ description: 'Whether the Todo is done', example: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
}

