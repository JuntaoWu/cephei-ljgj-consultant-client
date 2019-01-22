import { Injectable } from '@angular/core';
import { Api } from 'app/services/api/api';
import { Subject, Observable, of, empty, EMPTY, throwError } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { switchMap, flatMap, map, tap } from 'rxjs/operators';
import { MulterFile } from 'app/types/multer-file';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(public httpClient: HttpClient) { }

  public upload(url: string, file: MulterFile): Observable<number> {

    // var subject = new Subject<number>();
    let form = new FormData();
    form.append("timestamp", Date.now().toString());
    form.append("file", file.blob, file.filename);
    const req = new HttpRequest('POST', url,
      form,
      {
        reportProgress: true,
      });

    return this.httpClient.request(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(event);
        }
      }),
      switchMap((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          return of(percentDone);
        }
        else if (event instanceof HttpResponse) {
          // return new EmptyObservable<number>();
          console.log("HTTPResponse returned.");
          const body = event.body as any;
          if (body && body.code === 0 && body.data) {
            file.filename = body.data.filename;
            file.path = body.data.path;
            return EMPTY;
          }
          else {
            return throwError(body && body.message || "上传图片失败");
          }
        }
        else {
          console.log("Other HTTPEvent");
          return EMPTY;
        }
      }),
    );
  }
}
