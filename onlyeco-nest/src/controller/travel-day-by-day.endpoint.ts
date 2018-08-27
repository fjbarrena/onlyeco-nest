import {Controller, Delete, Get, Post} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import { GenericController } from './generic.controller';
import { TravelDayByDay } from '../entities/TravelDayByDay';
import { TravelDayByDayService } from '../service/travel.daybyday.service';

@Controller('api/travel-day-by-day')
@ApiUseTags('travel-day-by-day')
export class TravelDayByDayEndpoint extends GenericController<TravelDayByDay> {
    constructor(
        private readonly travelService: TravelDayByDayService
    ) {
        super(travelService);
    }
    
}