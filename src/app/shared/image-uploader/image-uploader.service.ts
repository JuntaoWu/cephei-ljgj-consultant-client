import { Injectable } from '@angular/core';
import { Api } from 'app/services/api/api';
import { Subject, Observable, of, empty, EMPTY } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { switchMap, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {

  constructor(public httpClient: HttpClient) { }

  public upload(url: string, file: Blob): Observable<number> {

    // var subject = new Subject<number>();
    const req = new HttpRequest('POST', url,
      {
        file: file
      },
      {
        //headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
        reportProgress: true,
      });

    return this.httpClient.request(req).pipe(switchMap((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        return of(percentDone);
      }
      else if (event instanceof HttpResponse) {
        // return new EmptyObservable<number>();
        return EMPTY;
      }
    }));
  }
}
