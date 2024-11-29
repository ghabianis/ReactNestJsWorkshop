
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import * as swagger from "@nestjs/swagger";
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SingInCreateInput } from './dto/SingInCreateInput';

@swagger.ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @HttpCode(HttpStatus.BAD_GATEWAY)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiBody({ type: SingInCreateInput }) 
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  @HttpCode(HttpStatus.BAD_GATEWAY)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @ApiBody({ type: SingInCreateInput }) 
  @Post('signUp')
  signUp(@Body() signInDto: Record<string, any>) {
    return this.authService.signup(signInDto);
  }


}
