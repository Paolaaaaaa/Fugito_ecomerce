import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ ProductCard, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  standalone: true
})
export class ProductList {

  products: Product[]=[]
  loading =false;
  error: string | null = null;

  constructor(private productService:ProductService){}
  ngOnInit():void{
    this.fetchProducts();
  }

  fetchProducts(){
    this.loading =true;
    this.error = null;
    this.productService.getAll().subscribe({
      next:(data)=>{
        this.products =data;
        this.loading =false
      },
      error:(err)=>{
        console.error(err);
        this.error = 'No se pudieron cargar los productos'
        this.loading =false;
      }
    })
  }

  handleView (productId:string){
    console.log( 'View product', productId);
  }

  handleAddToCart (product:Product){
    console.log( 'add product', product);
  }
}
