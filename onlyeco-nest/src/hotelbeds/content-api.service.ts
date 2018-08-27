import { Component, NotFoundException, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import {databaseConnection, nodemailerTransporter, fs, crypto, applicationEnvironment} from '../main';
import { HttpService } from '@nestjs/common/http';
import { RequestDebugInterceptor } from '../interceptor/request-debug.interceptor';

@Component()
export class HotelbedsContentAPIService  {
    constructor(private readonly httpService: HttpService) {
        
    }

    @UseInterceptors(RequestDebugInterceptor)
    public getDestinations(): Promise<any> {
        return this.httpService.get(applicationEnvironment.HOTELBEDS_API_URL +
            '/hotel-content-api/1.0/locations/destinations?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false',
            {
                headers: {
                    'Api-key': applicationEnvironment.HOTELBEDS_API_KEY,
                    'X-Signature': this.generateXSignature(),
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip'
                },
            }).toPromise().then(req => console.log(req));
    }

    @UseInterceptors(RequestDebugInterceptor)
    public getHotels(): Promise<any> {
        return this.httpService.get(applicationEnvironment.HOTELBEDS_API_URL +
            '/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false',
            {
                headers: {
                    'Api-key': applicationEnvironment.HOTELBEDS_API_KEY,
                    'X-Signature': this.generateXSignature(),
                    'Accept': 'application/json',
                    'Accept-Encoding': 'gzip'
                },
            }).toPromise().then(req => console.log(req));
        
    }

    public generateXSignature(): string {
        let secret = applicationEnvironment.HOTELBEDS_SECRET;
        let key = applicationEnvironment.HOTELBEDS_API_KEY;

        let hash = crypto.createHmac('sha256', applicationEnvironment.HOTELBEDS_SECRET)
                       .update(
                           applicationEnvironment.HOTELBEDS_API_KEY + 
                           applicationEnvironment.HOTELBEDS_SECRET + 
                           new Date().getMilliseconds() / 1000
                        )
                       .digest('hex');

        console.log(hash);

        return hash;
    }
}