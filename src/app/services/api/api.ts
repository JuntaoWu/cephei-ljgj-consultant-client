import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http';

import * as _ from "lodash";
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = environment.endpoint;

  constructor(public http: HttpClient, public nativeHttp: HTTP, private platform: Platform) {
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }
    let url = endpoint.startsWith("http") ? endpoint : this.url + '/' + endpoint;
    return this.http.get(url, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    // let data = body && _.map(body, (value: string, key: string) => {
    //   return `${key}=${encodeURIComponent(value)}`;
    // }).join("&");

    let url = endpoint.startsWith("http") ? endpoint : this.url + '/' + endpoint;
    if (this.platform.is("ios") && environment.production && (1 < 0)) {
      return from(this.nativeHttp.post(url, body, reqOpts || {})).pipe(map((resp) => {
        return resp.data;
      }));
    }
    else {
      return this.http.post(url, body, reqOpts);
      if (body instanceof FormData) {
        return this.http.post(url, body, reqOpts);
      }
      else {
        let data = new URLSearchParams();
        _.forIn(body, (value: string, key: string) => {
          data.append(key, value);
        });

        reqOpts = _.extend(reqOpts || {}, {
          headers: new HttpHeaders().append("Content-Type", "application/x-www-form-urlencoded")
        });
        return this.http.post(url, data.toString(), reqOpts);
      }
    }

  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
