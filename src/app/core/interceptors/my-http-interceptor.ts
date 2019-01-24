import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastService } from 'app/services/providers';
import { environment } from 'environments/environment';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) {
        console.log("MyHttpInterceptor constructor.");
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("MyHttpInterceptor intercepted request ... ");

        let token = localStorage.getItem("token");
        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("Authorization", `Bearer ${token}`) });

        console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq).pipe(
            catchError((error, caught) => {
                //intercept the response error and displace it to the console
                console.error("Error Occurred", error);
                //return the error to the method that called it
                if(!environment.production) {
                    this.toastService.show(error.message || error);
                }
                else {
                    this.toastService.show(`${error.status || error.statusText} - 数据加载失败`);
                }
                return throwError(error);
            })
        );
    }
}