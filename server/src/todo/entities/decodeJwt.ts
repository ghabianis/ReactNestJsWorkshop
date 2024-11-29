import { Injectable } from "@nestjs/common";

@Injectable()
export class DecodeJwt {

    /*
    this  method is created to showcase the way to decode the jwt token using it's base64 format
    */
    decode(signedJwtAccessToken : any){
        const base64Payload = signedJwtAccessToken.split('.')[1];
        const payloadBuffer = Buffer.from(base64Payload, 'base64');
        const decodedJwtAccessToken: any = JSON.parse(payloadBuffer.toString());
        return decodedJwtAccessToken;
    }
}