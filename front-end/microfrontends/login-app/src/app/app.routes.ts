import { RouterModule, Routes } from '@angular/router';
import { Login } from './login-registration/pages/login/login';
import { Register } from './login-registration/pages/register/register';
import { NgModule } from '@angular/core';

 export const  authRoutes: Routes = [

  {
    path: 'login',
    component: Login,
    title: 'Log In',
  },

    {
    path: 'register',
    component: Register,
    title: 'Register',
  },
    {
    path: '',
    component: Login,
    pathMatch: 'full',
    title: 'Home Page',
  },


];
