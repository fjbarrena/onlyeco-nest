import { Component } from '@nestjs/common';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {Travel} from '../entities/Travel';
import { TravelRequestInfo } from '../entities/TravelRequestInfo';
import { EmailService } from './email.service';
import { TravelService } from './travel.service';

@Component()
export class TravelRequestInfoService extends GenericService<TravelRequestInfo> implements IService<TravelRequestInfo> {
    constructor(private readonly emailService: EmailService,
                private readonly travelService: TravelService) {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(TravelRequestInfo);
    }

    async insert(object: TravelRequestInfo): Promise<void> {
        this.emailService.sendTravelCommunicationRequests(object);

        // Guardamos la petición en base de datos
        return await super.insert(object);
    }
}