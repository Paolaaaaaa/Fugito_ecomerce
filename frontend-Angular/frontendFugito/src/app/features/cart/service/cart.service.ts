import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly baseUrl =`${environment.apiBaseUrlCart}`;

  constructor(private htttp:HttpClient){}

  createCart(){
    
  }




  
}
