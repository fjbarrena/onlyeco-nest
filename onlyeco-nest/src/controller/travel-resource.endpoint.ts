import {Controller, Delete, Get, Post} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from '../service/user.service';
import {GenericController} from './generic.controller';
import {TravelService} from '../service/travel.service';
import {TravelDayByDayService} from '../service/travel.daybyday.service';
import {TravelResource} from '../entities/TravelResource';
import {TravelResourceService} from '../service/travel-resource.service';

@Controller('api/travel-resource')
@ApiUseTags('travel-resource')
export class TravelResourceEndpoint extends GenericController<TravelResource> {
    constructor(
        private readonly travelService: TravelResourceService
    ) {
        super(travelService);
    }
}