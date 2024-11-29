
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {

  }

  async signIn(signInDto: any) {
    if (!signInDto || !signInDto.password) {
      console.log('Bad data sent');
      throw new Error('Invalid signin data');
    }
    const user = await this.usersService.findOne(signInDto.email);
    console.log(user)

    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }


  async signup(data: any) {
    try {


      if (!data || !data.email) {
        throw new Error('Invalid signup data');
      }

      const user = await this.usersService.findOne(data.email);
      if (!user) {
        console.log('User not found, proceeding to create one');

        const createdUser = await this.usersService.create(data);
        if (createdUser) {
          const payload = { email: createdUser.email, sub: createdUser.id };
          const access_token = await this.jwtService.signAsync(payload);
          return {
            user: createdUser,
            access_token,
          };
        } else {
          throw new Error('User creation failed');
        }
      } else {
        throw new BadRequestException('User email or password already exists!');
      }
    } catch (error) {
      switch (error.status) {
        case 400:
          throw new BadRequestException(`Error: ${error.message}`)
        case 500:
          throw new InternalServerErrorException(`Internal server Error: ${error.message}`)
      }
    }
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret
    });
  }

}
