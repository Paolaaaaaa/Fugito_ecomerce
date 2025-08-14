import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../DTOs/LoginResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl: string;





  constructor(private http:HttpClient){



      this.apiUrl = `${environment.apiUrlAuth}v1/auth/`;
    
  }



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
