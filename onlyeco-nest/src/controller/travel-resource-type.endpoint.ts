import {Controller, Delete, Get, Post} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from "../service/user.service";
import {GenericController} from "./generic.controller";
import {TravelService} from "../service/travel.service";
import {TravelDayByDayService} from "../service/travel.daybyday.service";
import {TravelResource} from "../entities/TravelResource";
import {TravelResourceService} from "../service/travel-resource.service";
import {TravelResourceTypeService} from "../service/travel-resource-type.service";
import {TravelResourceType} from "../entities/TravelResourceType";

@Controller('api/travel-resource-type')
@ApiUseTags('travel-resource-type')
export class TravelResourceTypeEndpoint extends GenericController<TravelResourceType> {
    constructor(
        private readonly travelService: TravelResourceTypeService
    ) {
        super(travelService);
    }
}