import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTOs/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrlAuth}v1/auth/`

  constructor(private http:HttpClient){}



  register (userData:any){
    return this.http.post(`${this.apiUrl}register`, userData);
  }
  
  login (credentials:{email:string; password:string}):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, credentials);
  }

  saveToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }
  logout():void{
    localStorage.removeItem('token');

  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }


}
