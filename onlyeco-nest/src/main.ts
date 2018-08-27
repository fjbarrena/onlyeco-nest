import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {createConnection} from 'typeorm';
import { Environment, EnvironmentEnum } from './environments/environment';

export declare var databaseConnection: any;
export declare var multer: any;
export declare var uuidv4: any;
export declare var fs: any;
export declare var nodemailer: any;
export declare var nodemailerTransporter: any;
export declare var crypto: any; 
export declare var applicationEnvironment: Environment;
export declare var cassanKnex: any;

async function bootstrap() {
    await init();

    applicationEnvironment = loadEnvironmentData(EnvironmentEnum.DEVELOPMENT);
    
    console.log(applicationEnvironment);

    // create reusable transporter object using the default SMTP transport
    nodemailerTransporter = nodemailer.createTransport({
        host: applicationEnvironment.MAIL_HOST,
        port: applicationEnvironment.MAIL_PORT,
        secure: applicationEnvironment.MAIL_SECURE, // true for 465, false for other ports
        auth: {
            user: applicationEnvironment.MAIL_USERNAME, 
            pass: applicationEnvironment.MAIL_PASSWORD
        }
    });

    await createConnection().then(connection => {
         databaseConnection = connection;
    }).catch((error) => {
        console.log(error)
    });
    
    const app = await NestFactory.create(AppModule);
    
    const options = new DocumentBuilder()
        .setTitle('Onlyeco')
        .setDescription('API de Onlyeco')
        .setVersion('1.0')
        .build();
    
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/onlyeco/api', app, document);
    
    await app.listen(8080);
    console.log('Se ha levantado la aplicación correctamente en el puerto 8080');
}

async function init() {
    fs = require('fs');
    multer = require('multer');
    uuidv4 = require('uuid/v4');
    nodemailer = require('nodemailer');
    crypto = require('crypto');
}

function loadEnvironmentData(env: EnvironmentEnum) {
    let filename: string = '/environments/environment.#ENV#.json';
    
    switch(env) {
        case EnvironmentEnum.DEVELOPMENT:
            filename = filename.replace('#ENV#', 'dev');
            break;
        case EnvironmentEnum.PRODUCTION:
            filename = filename.replace('#ENV#', 'prod');
            break;               
    }

    let obj: Environment = JSON.parse(fs.readFileSync(__dirname + filename, 'utf-8'));;

    return obj;
}

bootstrap();



