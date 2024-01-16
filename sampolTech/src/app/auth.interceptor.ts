import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';// Adjust the import path accordingly
import { RequestInfoUtilities } from 'angular-in-memory-web-api';
import { LogInService } from './log-in/log-in.service';

@Injectable({
    providedIn: 'root',
    useClass: AuthInterceptor
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private logInService: LogInService,
    private requestUtils: RequestInfoUtilities
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api/users') && req.method === 'POST') {
      const credentials = this.requestUtils.getJsonBody(req);

      return this.logInService
        .authenticate(credentials)
        .pipe(
          switchMap((user) => {
            if (user) {
              const response = {
                body: user,
                status: 200,
              };
              return this.requestUtils.createResponse$(response);
            } else {
              return throwError({
                status: 401,
                statusText: 'Unauthorized',
              });
            }
          }),
          catchError((error) => throwError(error))
        );
    } else {
      return next.handle(req);
    }
  }
}
