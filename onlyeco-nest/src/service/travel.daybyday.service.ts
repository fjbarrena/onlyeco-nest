import { Component, UnauthorizedException } from '@nestjs/common';
import {User} from '../entities/User';
import {databaseConnection} from '../main';
import {GenericService} from './generic.service';
import {Travel} from '../entities/Travel';
import {TravelDayByDay} from '../entities/TravelDayByDay';

@Component()
export class TravelDayByDayService extends GenericService<TravelDayByDay> implements IService<TravelDayByDay> {
    constructor() {
        super();
    }
    
    initializeRepository() {
        this.repository = databaseConnection.getRepository(TravelDayByDay);
    }
    
    public async daysFromTravel(travelId: number): Promise<TravelDayByDay[]> {
        const days: any[] = await this.repository.manager.query(
            'SELECT * FROM travel_day_by_day WHERE travelId = ? ORDER BY dayNumber ASC', [travelId]
        ).catch((err) => { console.log(err);} );
        
        if(days !== null) {
            return days;
        }
        else {
            throw new UnauthorizedException('Usuario no encontrado o sin acceso');
        }
    }
}