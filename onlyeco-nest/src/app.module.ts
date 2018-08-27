import {Module, RequestMethod} from '@nestjs/common';
import {UserService} from './service/user.service';
import {UserEndpoint} from './controller/user.endpoint';
import {BusinessRequestEndpoint} from './controller/business-request.endpoint';
import {TravelEndpoint} from './controller/travel.endpoint';
import {TravelDayByDayService} from './service/travel.daybyday.service';
import {TravelDayByDayEndpoint} from './controller/travel-day-by-day.endpoint';
import {TravelResourceEndpoint} from './controller/travel-resource.endpoint';
import {TravelResourceTypeEndpoint} from './controller/travel-resource-type.endpoint';
import {BusinessRequestService} from './service/business-request.service';
import {TravelService} from './service/travel.service';
import {TravelResourceService} from './service/travel-resource.service';
import {TravelResourceTypeService} from './service/travel-resource-type.service';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import {CorsMiddleware} from './middleware/cors.middleware';
import {AuthenticationEndpoint} from './controller/authentication.controller';
import { TravelRequestInfoService } from './service/travel-request-info.service';
import { TravelRequestInfoEndpoint } from './controller/travel-request-info.endpoint';
import { EmailService } from './service/email.service';
import { HttpModule } from '@nestjs/common/http';
import { HotelbedsContentAPIService } from './hotelbeds/content-api.service';

@Module({
  imports: [
       HttpModule
  ],
  controllers: [
      BusinessRequestEndpoint,
      TravelEndpoint,
      TravelDayByDayEndpoint,
      TravelRequestInfoEndpoint,
      TravelResourceEndpoint,
      TravelResourceTypeEndpoint,
      UserEndpoint,
      AuthenticationEndpoint
  ],
  components: [
      BusinessRequestService,
      EmailService,
      TravelService,
      TravelDayByDayService,
      TravelResourceService,
      TravelResourceTypeService,
      TravelRequestInfoService,
      UserService,
      HotelbedsContentAPIService
  ],
})
export class AppModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(CorsMiddleware)
            .forRoutes({
                path: '*', method: RequestMethod.ALL
            });
    }
}
