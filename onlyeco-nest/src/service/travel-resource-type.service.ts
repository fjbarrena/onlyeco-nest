import { Component } from '@nestjs/common';
import {User} from '../entities/User';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {Travel} from "../entities/Travel";
import {TravelResourceType} from "../entities/TravelResourceType";
import {TravelResource} from "../entities/TravelResource";

@Component()
export class TravelResourceTypeService extends GenericService<TravelResourceType> implements IService<TravelResourceType> {
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(TravelResourceType);
    }
    
}