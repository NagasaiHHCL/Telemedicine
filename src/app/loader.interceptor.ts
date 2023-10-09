import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FetchdataService } from './fetchdata.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private service : FetchdataService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service.showLoader();

    return next.handle(req).pipe(
      finalize(() => {
        this.service.hideLoader();
      })
    );
  }
}
