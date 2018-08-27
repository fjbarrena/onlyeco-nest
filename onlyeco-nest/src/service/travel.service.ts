import { Component } from '@nestjs/common';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {Travel} from '../entities/Travel';

@Component()
export class TravelService extends GenericService<Travel> implements IService<Travel> {
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(Travel);
    }

    public async findActiveTravels(): Promise<Travel[]> {
        const activeTravels: any[] = await this.repository.manager.query(
            'SELECT * FROM travel ' +
            'WHERE active = 1 AND (automaticExpirationDate IS NULL OR automaticExpirationDate >= current_date()) ' +
            'ORDER BY id DESC'
        ).catch((err) => { console.log(err);} );
        
        if(activeTravels !== null) {
            return activeTravels;
        }
        else {
            return [];
        }
    }
}