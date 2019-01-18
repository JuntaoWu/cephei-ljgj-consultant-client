import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() {
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
                console.log("Error Occurred");
                console.log(error);
                //return the error to the method that called it
                return throwError(error);
            })
        );
    }
}