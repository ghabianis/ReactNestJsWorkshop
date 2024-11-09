
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

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

    const payload = { email: user.email, sub: user.userId };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }


  async signup(data: any) {
    if (!data || !data.email) {
      console.log('Bad data sent');
      throw new Error('Invalid signup data');
    }

    console.log('Signup controller:', data.email);

    const user = await this.usersService.findOne(data.email);
    if (!user) {
      console.log('User not found, proceeding to create one');

      const createdUser = await this.usersService.create(data);
      if (createdUser) {
        const payload = { email: createdUser.email, sub: createdUser.userId };
        const access_token = await this.jwtService.signAsync(payload);
        return {
          user: createdUser,
          access_token,
        };
      } else {
        throw new Error('User creation failed');
      }
    } else {
      throw new Error('User email or password already exists!');
    }
  }


}
