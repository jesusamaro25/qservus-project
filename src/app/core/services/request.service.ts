import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Information } from 'src/app/models/information.model';

@Injectable()
export class RequestService {

  private url: string = environment.api_url;

  constructor(public _http: HttpClient) { }

  post(data: Information): Observable<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + 'users', data, { headers: headers });
  }
}