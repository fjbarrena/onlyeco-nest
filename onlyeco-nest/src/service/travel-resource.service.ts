import { Component } from '@nestjs/common';
import {User} from '../entities/User';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {Travel} from '../entities/Travel';
import {TravelDayByDay} from '../entities/TravelDayByDay';
import {TravelResource} from '../entities/TravelResource';

@Component()
export class TravelResourceService extends GenericService<TravelResource> implements IService<TravelResource> {
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(TravelResource);
    }
    
    public async resourcesFromTravel(travelId: number): Promise<TravelResource[]> {
        const images: any[] = await this.repository.manager.query(
            'SELECT * FROM travel_resource WHERE travelId = ? ', [travelId]
        ).catch((err) => { console.log(err);} );
        
        if(images !== null) {
            return images;
        }
        else {
            return [];
        }
    }

    public async deleteResourceFromTravel(travelId: number, resourceUUID: string): Promise<any> {
        const result: any = await this.repository.manager.query(
            'DELETE FROM travel_resource WHERE travelId = ? AND value = ? ', [travelId, resourceUUID]
        ).catch((err) => { console.log(err);} );
        
        return result;
    }
}