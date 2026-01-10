import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  // eventos hacia el padre
  @Output() view = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<Product>();

  onView() {
    this.view.emit(this.product.id);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
