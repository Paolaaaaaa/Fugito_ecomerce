import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'app/products'},
    {path:'auth/login', loadComponent:() => import('./pages/login/login').then(m => m.Login)},
    {path:'app/products', loadComponent:()=> import('./pages/products/products').then(m => m.Products)},
    {path: 'app/cart', loadComponent:()=> import('./pages/cart/cart').then(m => m.Cart)},
    {path:'**', redirectTo: 'products'}
];
