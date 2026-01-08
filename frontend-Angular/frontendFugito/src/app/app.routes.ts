import { Routes } from '@angular/router';
import {Products} from './pages/products/products';
import { Login } from './pages/login/login';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'products'},
    {path:'login', loadComponent:() => import('./pages/login/login').then(m => m.Login)},
    {path:'products', loadComponent:()=> import('./pages/products/products').then(m => m.Products)},
    {path: 'cart', loadComponent:()=> import('./pages/cart/cart').then(m => m.Cart)},
    {path:'**', redirectTo: 'products'}
];
