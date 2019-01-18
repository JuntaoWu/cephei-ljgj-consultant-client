import { Component, OnInit, Input } from '@angular/core';
import { LoadingInterceptor } from '../interceptors/loading-interceptor';
import { partition, switchMap, debounceTime, debounce, mergeAll, mergeMap, switchAll, distinctUntilChanged, tap } from 'rxjs/operators';
import { timer, merge, Observable, Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() minDuration = 500;

  @Input() debounceDelay = 100;

  visibleUntil: number;

  private subscription: Subscription;

  private visible = false;

  constructor(private loadingInterceptor: LoadingInterceptor, private loadingController: LoadingController) {
    const [showSpinner$, hideSpinner$] = partition((hasPendingRequests: boolean) => hasPendingRequests)(this.loadingInterceptor.pendingRequestsStatus$);
    this.subscription = merge(
      this.loadingInterceptor.pendingRequestsStatus$.asObservable().pipe(
        switchMap(() => showSpinner$.pipe(debounce(() => timer(this.debounceDelay))))
      ),
      showSpinner$.pipe(
        switchMap(() => hideSpinner$.pipe(debounce(() => this.getVisibilityTimer$())))
      ),
    ).pipe(
      distinctUntilChanged(),
      tap(showSpinner => {
        this.updateExpirationDelay(showSpinner);
      })
    ).subscribe(async (visible) => {
      console.log("visible:", visible);
      this.visible = visible;
      if (this.visible) {
        const loading = await this.loadingController.create({
          spinner: 'crescent',
          showBackdrop: false,
          message: "加载中",
        });
        console.log("visible after loading created:", this.visible);
        if (this.visible) {
          console.log("present now");
          loading.present();
        }
        else {
          const loading = await this.loadingController.getTop();
          loading && loading.dismiss();
        }
      }
      else {
        const loading = await this.loadingController.getTop();
        loading && loading.dismiss();
      }
    });
  }


  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  private updateExpirationDelay(showSpinner: boolean) {
    if (showSpinner) {
      this.visibleUntil = Date.now() + this.minDuration;
    }
  }

  private getVisibilityTimer$(): Observable<number> {
    return timer(Math.max(0, this.visibleUntil - Date.now()));
  }

}
