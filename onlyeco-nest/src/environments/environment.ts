import { fs } from "../main";
import { InternalServerErrorException } from "@nestjs/common";

export class Environment {
    cipherKey: string = 'b4ck&nBL4CK_Y€sAIMB492716279871239128379_Ññt';
    JWT_ID: string = 'jsonwebtoken';
    JWT_KEY: string = '0nly3c0_T!t$s4nDM00z$r(T)';
    TRAVEL_IMAGE_FOLDER: string = '/opt/server/uploads/';
    
    MAIL_HOST: string = 'smtp.gmail.com';
    MAIL_PORT: number = 587;
    // True for 465, false for other ports
    MAIL_SECURE: boolean = false;
    MAIL_USERNAME: string = 'mozart.mae@gmail.com';
    MAIL_PASSWORD: string = 'n0tienen0tiene';
    HOTELBEDS_API_URL: string = 'https://api.test.hotelbeds.com';
    HOTELBEDS_API_KEY: string = 'fzk98nzdg46cu9budw2wyd35';
    HOTELBEDS_SECRET: string = 'ZJfVPHSkyK';
    
    constructor() {
        
    }
}


export enum EnvironmentEnum {
    DEVELOPMENT,
    PRODUCTION
}