import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, UserData } from './interfaces.type';



@Injectable({
  providedIn: 'root',
})
export class APIService {
  private baseUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}
  username: string = '';
  password: string = '';

  getloginToken(
    path: string,
    username: string,
    password: string,
    params: string
  ): Observable<UserData> {
    const url = `${this.baseUrl}${path}`;
    this.username = username;
    this.password = password;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
      username,
      password,
    });

    return this.http.post<any>(url, body, { headers });
  }

  getProducts(path: string): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    return this.http.get<Product>(url);
  }

  getProductCategory(path: string, product: string): Observable<any> {
    const url = `${this.baseUrl}${path}${product}`;
    return this.http.get<Product>(url);
  }

  getProductByParams(path: string, params: any): Observable<any> {
    const url = `${this.baseUrl}${path}${params}`;
    return this.http.get<Product>(url);
  }
}
