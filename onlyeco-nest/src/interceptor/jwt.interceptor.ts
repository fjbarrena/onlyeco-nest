import { Interceptor, NestInterceptor, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { IncomingMessage } from 'http';
import * as jwt from 'jsonwebtoken';
import { applicationEnvironment } from '../main';

@Interceptor()
export class JwtInterceptor implements NestInterceptor {
  intercept(dataOrRequest: IncomingMessage, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    let receivedToken = dataOrRequest.headers['authorization'];

    try {
      if(receivedToken) {
        let decoded = jwt.verify(receivedToken, applicationEnvironment.JWT_KEY);
      }
      else {
        // No ha llegado token...
        throw UnauthorizedException;
      }
    } catch(err) {
      throw UnauthorizedException;
    }

    return stream$.do(
      () => {},
    );
  }
}