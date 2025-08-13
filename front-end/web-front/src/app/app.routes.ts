import { Routes } from '@angular/router';
import { Login } from './login-registration/pages/login/login';
import { FormLogin } from './login-registration/components/form-login/form-login';
import { Register } from './login-registration/pages/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    title: 'Home Page',
  },
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
    path: '**',
    component: Register,
    title: 'Not Found',
  },
];
