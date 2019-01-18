import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingController: LoadingController) {
        console.log("LoadingInterceptor constructor.");
     }

    private pendingRequests = 0;
    public pendingRequestsStatus$ = new ReplaySubject<boolean>(1);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("LoadingInterceptor intercepted request ... ");

        // let loading: HTMLIonLoadingElement;
        // this.loadingController.create({
        //     message: "加载中...",
        // }).then((loadingIndicator) => {
        //     loading = loadingIndicator;
        //     loadingIndicator.present();
        // });

        ++this.pendingRequests;
        // only trigger pendingRequestsStatus$ when count 1.
        if (this.pendingRequests === 1) {
            this.pendingRequestsStatus$.next(true);
        }

        //send the newly created request
        return next.handle(req).pipe(
            finalize(() => {
                console.log("LoadingInterceptor request completed.");
                --this.pendingRequests;

                if (this.pendingRequests === 0) {
                    this.pendingRequestsStatus$.next(false);
                }
            }),
            catchError((error, caught) => {
                return throwError(error);
            })
        );
    }
}