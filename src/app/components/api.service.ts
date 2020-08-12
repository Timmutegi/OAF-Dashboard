import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://mbima.bluewaveinsurance.co:4435/api';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  login(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }

  get(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint, this.httpOptions);
  }

  post(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data, this.httpOptions);
  }
}
