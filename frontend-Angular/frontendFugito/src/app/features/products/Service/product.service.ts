import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly baseUrl = `${environment.apiBaseUrl}/v1/product`;
  constructor(private http:HttpClient) {}

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id:string){
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  
}
