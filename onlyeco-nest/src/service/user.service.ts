import { Component, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {User} from '../entities/User';
import {GenericService} from './generic.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {databaseConnection, applicationEnvironment} from '../main';

@Component()
export class UserService extends GenericService<User> implements IService<User> {
    private _options: any = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: applicationEnvironment.JWT_ID || '',
    };
    
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(User);
    }
    
    public async insert(userData: User): Promise<void> {
        // Nos llega un usuario con la contraseña en claro. Tenemos que guardarla encriptada
        userData.encryptedPassword = this.encryptPassword(userData.loginEmail, userData.encryptedPassword);
        
        return super.insert(userData);
    }

    public async update(userData: User): Promise<User> {
        // Nos llega un usuario con la contraseña en claro. Tenemos que guardarla encriptada
        userData.encryptedPassword = this.encryptPassword(userData.loginEmail, userData.encryptedPassword);
        
        return super.update(userData);
    }
    
    public async sign(email: string, password: string): Promise<string> {
        // Nos llega un usuario con la contraseña en claro, pero en la base de datos está encriptada. Tenemos que
        // encriptarla para poder compararla
        let encryptedPassword = this.encryptPassword(email, password);
    
        const user: any[] = await this.repository.manager.query(
            'SELECT * FROM user WHERE loginEmail = ? AND encryptedPassword = ?', [email, encryptedPassword]
        ).catch((err) => { console.log(err);} );
        
        if(user !== null && user.length === 1) {
            // Solo debe haber un usuario con esas características...
            const payload = {
                id: user[0].id,
                email: user[0].loginEmail
            };

            return await jwt.sign(payload, applicationEnvironment.JWT_KEY || '', this._options);
            
        }
        else {
            throw new UnauthorizedException('Usuario no encontrado o sin acceso');
        }
    }
    
    private encryptPassword(email: string, password: string): string {
        let customUserCipher = applicationEnvironment.cipherKey + email;
        const cipher = crypto.createCipher('aes192', customUserCipher);
    
        let encrypted = cipher.update(password, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    
        return encrypted;
    }
}