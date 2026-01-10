import { Component } from '@angular/core';
import { ProductList } from '../../features/products/product-list/product-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductList, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
null: any;

}
