import { Interceptor, NestInterceptor, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { applicationEnvironment } from '../main';

@Interceptor()
export class RequestDebugInterceptor implements NestInterceptor {
  intercept(dataOrRequest: IncomingMessage, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    console.log(dataOrRequest);

    return stream$.do(
      () => {},
    );
  }
}