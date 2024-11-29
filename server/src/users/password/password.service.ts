import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    private saltRounds = 10;

   async  hashPassword(password: string){
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword;
    }

}
