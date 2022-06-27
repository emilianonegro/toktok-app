import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.URL_BACKEND;

  constructor(private _http: HttpClient) {}
  getRoom(url: any) {
    return this._http.get(`${this.baseUrl}room/${url}`);
  }
  getOldMessages(url: any) {
    return this._http.get(`${this.baseUrl}room/${url}`);
  }
}
