import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { getToken } from './user-context';
  
  @Injectable()
  export class InterceptorService implements HttpInterceptor {
    constructor() {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token: string | null = getToken();
      if (token) {
        let request = req.clone({
          headers:new HttpHeaders ({
            Authorization: `Bearer ${token}`,
          }),
        });
        return next.handle(request);
      } else {
        return next.handle(req);
      }
    }
  }