import {Body, Controller, Delete, Get, Post, UseInterceptors} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {UserService} from '../service/user.service';
import {GenericController} from './generic.controller';
import {User} from '../entities/User';
import {BusinessRequests} from '../entities/BusinessRequests';
import { JwtInterceptor } from 'interceptor/jwt.interceptor';
import { HotelbedsContentAPIService } from '../hotelbeds/content-api.service';
import { RequestDebugInterceptor } from '../interceptor/request-debug.interceptor';

@Controller('api/user')
@ApiUseTags('user')
export class UserEndpoint extends GenericController<User> {
    constructor(
        private readonly userService: UserService,
        private readonly hotelbeds: HotelbedsContentAPIService
    ) {
        super(userService);
    }

    @UseInterceptors(RequestDebugInterceptor)
    @Get('hotelbeds')
    activeTravels(): Promise<any> {
        return this.hotelbeds.getDestinations();
    }

    @UseInterceptors(RequestDebugInterceptor)
    @Get('hotelbeds2')
    activeTravels2(): Promise<any> {
        return this.hotelbeds.getHotels();
    }
}