import { Component, Input, Output , EventEmitter} from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [ CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true,
})
export class ProductCard {

  @Input({required:true}) product!: Product;

  @Output() view = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<Product>();


  onView(){
    this.view.emit(this.product.id)
  }
  onAddToCart(){
    this.addToCart.emit(this.product)
  }

 
}
