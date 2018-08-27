import {Body, Controller, Delete, Get, Post, Interceptor} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from "../service/user.service";
import {GenericController} from "./generic.controller";
import {BusinessRequestService} from "../service/business-request.service";
import {BusinessRequests} from "../entities/BusinessRequests";
import {OverrideBy} from "@nestjs/testing";
import { JwtInterceptor } from 'interceptor/jwt.interceptor';
import { EmailService } from '../service/email.service';

@Controller('api/business-request')
@ApiUseTags('business-request')
export class BusinessRequestEndpoint extends GenericController<BusinessRequests> {
    constructor(
        private readonly businessRequestService: BusinessRequestService,
        private readonly emailService: EmailService
    ) {
        super(businessRequestService);
    }
   
    @Post()
    create(@Body() object: BusinessRequests) {
        this.emailService.sendBusinessCommunicationEmail(object);
        return super.create(object);
    }
}