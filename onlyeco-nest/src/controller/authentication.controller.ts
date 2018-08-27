import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {UserService} from "../service/user.service";
import {GenericController} from "./generic.controller";
import {User} from "../entities/User";
import {BusinessRequests} from "../entities/BusinessRequests";
import {LoginDTO} from "../dto/login.dto";

@Controller('api/auth')
@ApiUseTags('auth')
export class AuthenticationEndpoint {
    constructor(
        private readonly userService: UserService
    ) {
    
    }
    
    @Post('/login')
    login(@Body() object: LoginDTO) {
        return this.userService.sign(object.email, object.password);
    }
}