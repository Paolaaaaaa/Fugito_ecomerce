import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY ='access_key';

  getToken(): string| null{
    return localStorage.getItem(this.TOKEN_KEY);
  }


  setToken(token: string){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isLoggedIn():boolean{
    return !!this.getToken();
  }
  
}
