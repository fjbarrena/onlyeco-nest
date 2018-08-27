import { Component } from '@nestjs/common';
import {User} from '../entities/User';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {BusinessRequests} from '../entities/BusinessRequests';

@Component()
export class BusinessRequestService extends GenericService<BusinessRequests> implements IService<BusinessRequests> {
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(BusinessRequests);
    }
    
}