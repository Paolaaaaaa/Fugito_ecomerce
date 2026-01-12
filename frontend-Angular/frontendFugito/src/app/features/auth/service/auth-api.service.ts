import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../DTOS/LoginRequest';
import { Observable } from 'rxjs';
import { AuthResponse } from '../DTOS/AuthResponse';
import { RegisterRequest } from '../DTOS/RegisterRequest';

@Injectable({
  providedIn: 'root',
})


export class AuthApiService {
  private readonly baseUrl =`${environment.apiBaseUrlAuth}`;

  constructor(private http: HttpClient){}

  login(body:LoginRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body);
  }


    register (body:RegisterRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, body);
  }


  
}
