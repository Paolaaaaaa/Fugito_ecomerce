import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY ='access_key';
  private readonly isBrowser: boolean;
  private  loggedIn =false;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getToken(): string| null{
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }


  setToken(token: string){
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, token);
    this.loggedIn=true;
  }

  logout(){
    if (!this.isBrowser) {
      return;
    }
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn=false;
  }
  isLoggedIn():boolean{
    return this.loggedIn
  }
  
}
