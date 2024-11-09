
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SingInCreateInput } from './dto/SingInCreateInput';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SingInCreateInput }) 
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SingInCreateInput }) 
  @Post('signUp')
  signUp(@Body() signInDto: Record<string, any>) {
    console.log(signInDto)
    return this.authService.signup(signInDto);
  }


}
