import {Controller, Delete, Get, Post, Body} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from '../service/user.service';
import {GenericController} from './generic.controller';
import {TravelService} from '../service/travel.service';
import {TravelDayByDayService} from '../service/travel.daybyday.service';
import {TravelResource} from '../entities/TravelResource';
import {TravelResourceService} from '../service/travel-resource.service';
import { TravelRequestInfo } from '../entities/TravelRequestInfo';
import { TravelRequestInfoService } from '../service/travel-request-info.service';
import { EmailService } from '../service/email.service';

@Controller('api/travel-request-info')
@ApiUseTags('travel-request-info')
export class TravelRequestInfoEndpoint extends GenericController<TravelRequestInfo> {
    constructor(
        private readonly travelRequestInfoService: TravelRequestInfoService,
        private readonly emailService: EmailService
    ) {
        super(travelRequestInfoService);
    }
}