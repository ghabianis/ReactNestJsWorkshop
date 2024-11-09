import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserWhereUniqueInput {
    @ApiProperty({ description: 'email', example: 'anisghabi8@gmail.com' })
    @IsNotEmpty()
    @IsString()
    email
  
}

